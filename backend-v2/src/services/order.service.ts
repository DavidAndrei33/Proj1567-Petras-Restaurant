import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";
import { canTransition, STATUS_LABELS } from "../types/order.js";
import { publishOrderEvent } from "../utils/events.js";
import type {
  CreateOrderInput,
  UpdateStatusInput,
  OrderQueryInput,
} from "../validations/order.validation.js";

export async function createOrder(input: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    // Fetch products and validate stock
    const productIds = input.items.map((i) => i.productId);
    const products = await tx.product.findMany({
      where: { id: { in: productIds }, isAvailable: true },
    });

    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missing = productIds.filter((id) => !foundIds.includes(id));
      throw Object.assign(
        new Error(`Products not found or unavailable: ${missing.join(", ")}`),
        { statusCode: 400 }
      );
    }

    // Calculate total
    let total = new Prisma.Decimal(0);
    const orderItems = input.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const itemTotal = product.price.mul(item.quantity);
      total = total.add(itemTotal);
      return {
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    // Create order with items
    const order = await tx.order.create({
      data: {
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerAddress: input.customerAddress,
        total,
        status: OrderStatus.RECEIVED,
        paymentMethod: input.paymentMethod,
        notes: input.notes,
        items: { create: orderItems },
        statusHistory: {
          create: {
            status: OrderStatus.RECEIVED,
            notes: "Comanda primita",
          },
        },
      },
      include: {
        items: { include: { product: true } },
        statusHistory: true,
      },
    });

    return order;
  }).then((order) => {
    publishOrderEvent({
      type: "ORDER_CREATED",
      orderId: order.id,
      status: order.status,
      timestamp: new Date().toISOString(),
      data: {
        customerName: order.customerName,
        total: order.total,
        itemCount: order.items.length,
      },
    });
    return order;
  });
}

export async function getOrders(query: OrderQueryInput) {
  const where: any = {};

  if (query.status) {
    where.status = query.status.toUpperCase();
  }

  if (query.phone) {
    where.customerPhone = { contains: query.phone };
  }

  if (query.dateFrom || query.dateTo) {
    where.createdAt = {};
    if (query.dateFrom) {
      where.createdAt.gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      where.createdAt.lte = new Date(query.dateTo);
    }
  }

  const skip = (query.page - 1) * query.limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        items: { include: { product: true } },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: query.limit,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function getOrderByIdAndPhone(id: number, phone: string) {
  return prisma.order.findFirst({
    where: {
      id,
      customerPhone: { contains: phone },
    },
    include: {
      items: { include: { product: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function getMyOrders(userId: number) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: { include: { product: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(
  orderId: number,
  input: UpdateStatusInput
) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw Object.assign(new Error("Order not found"), { statusCode: 404 });
    }

    const newStatus = input.status as OrderStatus;

    if (!canTransition(order.status, newStatus)) {
      throw Object.assign(
        new Error(
          `Invalid status transition from ${STATUS_LABELS[order.status]} to ${STATUS_LABELS[newStatus]}`
        ),
        { statusCode: 400 }
      );
    }

    const updated = await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: {
        items: { include: { product: true } },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
    });

    await tx.orderStatusHistory.create({
      data: {
        orderId,
        status: newStatus,
        notes: input.notes || `Status updated to ${STATUS_LABELS[newStatus]}`,
      },
    });

    return updated;
  }).then((order) => {
    publishOrderEvent({
      type: "ORDER_STATUS_CHANGED",
      orderId: order.id,
      status: order.status,
      timestamp: new Date().toISOString(),
      data: {
        notes: input.notes,
      },
    });
    return order;
  });
}

export async function getOrderStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [
    totalOrders,
    todayOrders,
    todayRevenue,
    pendingOrders,
    statusCounts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.aggregate({
      where: { createdAt: { gte: today } },
      _sum: { total: true },
    }),
    prisma.order.count({ where: { status: { in: ["RECEIVED", "ACCEPTED", "PREPARING", "READY", "OUT_FOR_DELIVERY"] } } }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const statusMap = statusCounts.reduce((acc, curr) => {
    acc[curr.status] = curr._count.status;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalOrders,
    todayOrders,
    todayRevenue: todayRevenue._sum.total?.toNumber() || 0,
    pendingOrders,
    statusCounts: statusMap,
    // Weekly sales data for chart
    weeklySales: await getWeeklySales(),
  };
}

async function getWeeklySales() {
  const days = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayOrders = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
      _sum: { total: true },
      _count: { id: true },
    });

    result.push({
      day: days[date.getDay()],
      sales: dayOrders._sum.total?.toNumber() || 0,
      orders: dayOrders._count.id,
    });
  }

  return result;
}
