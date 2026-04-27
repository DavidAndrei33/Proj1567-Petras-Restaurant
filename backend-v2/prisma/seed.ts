import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Rotisor", slug: "rotisor", description: "Pui, curcan, rata la rotisor", sortOrder: 1 },
      { name: "Pizza", slug: "pizza", description: "Pizza autentică italiană", sortOrder: 2 },
      { name: "Garnituri", slug: "garnituri", description: "Cartofi, orez, legume", sortOrder: 3 },
      { name: "Salate", slug: "salate", description: "Salate proaspete", sortOrder: 4 },
      { name: "Desert", slug: "desert", description: "Dulciuri și deserturi", sortOrder: 5 },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${categories.count} categories`);

  // Products
  const rotisorCat = await prisma.category.findUnique({ where: { slug: "rotisor" } });
  const pizzaCat = await prisma.category.findUnique({ where: { slug: "pizza" } });
  const garnituriCat = await prisma.category.findUnique({ where: { slug: "garnituri" } });

  const products = await prisma.product.createMany({
    data: [
      { name: "Pui Rotisat 1/2", description: "Jumătate de pui la rotisor cu ierburi aromatice", price: 28.00, categoryId: rotisorCat!.id, isFeatured: true },
      { name: "Pui Rotisat Întreg", description: "Pui întreg la rotisor", price: 52.00, categoryId: rotisorCat!.id },
      { name: "Pizza Diavola", description: "Salam picant, mozzarella, sos de roșii", price: 35.00, categoryId: pizzaCat!.id, isFeatured: true },
      { name: "Pizza Quattro Formaggi", description: "Patru feluri de brânză", price: 38.00, categoryId: pizzaCat!.id },
      { name: "Pizza Margherita", description: "Mozzarella, busuioc, sos de roșii", price: 28.00, categoryId: pizzaCat!.id },
      { name: "Cartofi Prăjiți", description: "Cartofi prăjiți crocanți", price: 12.00, categoryId: garnituriCat!.id },
      { name: "Cartofi Wedges", description: "Cartofi wedges cu ierburi", price: 14.00, categoryId: garnituriCat!.id },
      { name: "Orez Sălbatic", description: "Orez sălbatic cu legume", price: 10.00, categoryId: garnituriCat!.id },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${products.count} products`);

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@rotiserie.ro",
      password: "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$somehash", // Placeholder - will be rehashed on login
      name: "Admin Principal",
      role: "ADMIN",
      phone: "0234 123 456",
      pin: "1234",
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Business hours
  const hours = await prisma.businessHour.createMany({
    data: [
      { dayOfWeek: 1, openTime: "10:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 2, openTime: "10:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 3, openTime: "10:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 4, openTime: "10:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 5, openTime: "10:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 6, openTime: "10:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 0, openTime: "10:00", closeTime: "22:00", isClosed: false },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${hours.count} business hours`);

  // Settings
  const settings = await prisma.setting.createMany({
    data: [
      { key: "restaurantName", value: "Rotiserie & Pizza Moinești" },
      { key: "address", value: "Strada Principală nr. 45, Moinești, Bacău" },
      { key: "phone", value: "0234-123-456" },
      { key: "email", value: "contact@rotiserie-moinesti.ro" },
      { key: "deliveryFee", value: "10" },
      { key: "minOrder", value: "30" },
      { key: "deliveryEnabled", value: "true" },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${settings.count} settings`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
