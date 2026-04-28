import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Petra's Restaurant...");

  // Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Entrée", slug: "entree", description: "Platouri de aperitive", sortOrder: 1 },
      { name: "Antipasti", slug: "antipasti", description: "Aperitive italienesti", sortOrder: 2 },
      { name: "Pasta / Primi", slug: "pasta-primi", description: "Paste artizanale", sortOrder: 3 },
      { name: "Secondi di Carne", slug: "secondi-carne", description: "Preparate din carne", sortOrder: 4 },
      { name: "Specialità di Carne", slug: "specialita-carne", description: "Specialitati din carne", sortOrder: 5 },
      { name: "Specialità di Mare", slug: "specialita-mare", description: "Fructe de mare", sortOrder: 6 },
      { name: "Pizza", slug: "pizza", description: "Pizza napoletana 3 cereali", sortOrder: 7 },
      { name: "Desert", slug: "desert", description: "Deserturi italiene", sortOrder: 8 },
      { name: "Bauturi Non-Alcoolice", slug: "bauturi-nonalcoolice", description: "Sucuri, apa, cafea", sortOrder: 9 },
      { name: "Bere", slug: "bere", description: "Bere artizanala", sortOrder: 10 },
      { name: "Vinotecă", slug: "vinoteca", description: "Vinuri selecte", sortOrder: 11 },
      { name: "Bauturi Spirtoase", slug: "bauturi-spirtoase", description: "Digestive, whisky, cocktailuri", sortOrder: 12 },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${categories.count} categories`);

  // Get category IDs
  const entreeCat = await prisma.category.findUnique({ where: { slug: "entree" } });
  const antipastiCat = await prisma.category.findUnique({ where: { slug: "antipasti" } });
  const pastaCat = await prisma.category.findUnique({ where: { slug: "pasta-primi" } });
  const secondiCat = await prisma.category.findUnique({ where: { slug: "secondi-carne" } });
  const specCarneCat = await prisma.category.findUnique({ where: { slug: "specialita-carne" } });
  const specMareCat = await prisma.category.findUnique({ where: { slug: "specialita-mare" } });
  const pizzaCat = await prisma.category.findUnique({ where: { slug: "pizza" } });
  const desertCat = await prisma.category.findUnique({ where: { slug: "desert" } });

  // Products
  const products = await prisma.product.createMany({
    data: [
      // Entrée
      { name: "Affettato Misto", description: "Platou mix: prosciutto crudo, speck, mortadella, salami (650gr)", price: 159.00, categoryId: entreeCat!.id },
      { name: "Misto Formaggi", description: "Brie, parmigiano (DOP), pecorino, gorgonzola, scamorza (450gr)", price: 99.00, categoryId: entreeCat!.id },
      { name: "Salata Petra's", description: "Salata verde, rosii cherry, seminte, parmigiano, ulei de masline (210gr)", price: 23.00, categoryId: entreeCat!.id },

      // Antipasti
      { name: "Bruschetta dello Chef", description: "Ciabatta cu vin Marsala (580gr)", price: 39.00, categoryId: antipastiCat!.id },
      { name: "Bruschetta di Mare", description: "Creveti, baby calamari, avocado, salsa cocktail (480gr)", price: 49.00, categoryId: antipastiCat!.id },
      { name: "Vitello Tonnato", description: "Carne de vita, maioneza, ton, capere (200gr)", price: 45.00, categoryId: antipastiCat!.id },
      { name: "Piccola Frittura Napoletana di Terra", description: "Legume tempura, zeppole napoletane (500gr)", price: 39.00, categoryId: antipastiCat!.id },
      { name: "Zeppole e Prosciutto Crudo", description: "Aluat dospit cu prosciutto crudo (500gr)", price: 39.00, categoryId: antipastiCat!.id },

      // Pasta
      { name: "Spaghetti con le Vongole", description: "Spagheti, scoici, usturoi, ulei de masline (490gr)", price: 45.00, categoryId: pastaCat!.id },
      { name: "Tagliatelle alla Bolognese", description: "Paste proaspete cu ragù alla bolognese (490gr)", price: 39.00, categoryId: pastaCat!.id },
      { name: "Lasagna", description: "Foi de aluat, carne mixta, bechamel, parmigiano DOP (420gr)", price: 40.00, categoryId: pastaCat!.id },
      { name: "Parmigiana", description: "Vinete, busturoi, ulei de masline, parmigiano DOP (500gr)", price: 40.00, categoryId: pastaCat!.id },
      { name: "Pasta ai Frutti di Mare", description: "Fructe de mare, baby calamari, creveti, midii (450gr)", price: 41.00, categoryId: pastaCat!.id },
      { name: "Paccheri con Guanciale e Funghi Porcini", description: "Guanciale de porc, funghi porcini (410gr)", price: 44.00, categoryId: pastaCat!.id },
      { name: "Carbonara Autentica", description: "Guanciale, pecorino DOP, oua (fara smantana!) (380gr)", price: 41.00, categoryId: pastaCat!.id, isFeatured: true },
      { name: "Pasta Quattro Formaggi", description: "Parmigiano, gorgonzola, scamorza (580gr)", price: 44.00, categoryId: pastaCat!.id },
      { name: "Cannelloni al Prosciutto Crudo", description: "Prosciutto crudo, parmigiano DOP, bescamel (380gr)", price: 42.00, categoryId: pastaCat!.id },
      { name: "Gnocchi con Asiago e Hribi", description: "Gnocchi, parmigiano DOP, hribi (380gr)", price: 42.00, categoryId: pastaCat!.id },
      { name: "Pasta Golfo Posillipo", description: "Creveti, scoci, calamari, ierburi aromatice (380gr)", price: 49.00, categoryId: pastaCat!.id },

      // Secondi di Carne
      { name: "Capocollo Mangalitza", description: "Ceafa de mangalita, piure si muraturi (460gr)", price: 89.00, categoryId: secondiCat!.id },
      { name: "Cotoletta con Patatine", description: "Snitel din carne de porc cu cartofi prajiti (400gr)", price: 44.00, categoryId: secondiCat!.id },
      { name: "Costine di Maiale, Patate al Forno", description: "Coaste de porc, cartofi la cuptor, sos brean (520gr)", price: 49.00, categoryId: secondiCat!.id },
      { name: "Burger della Casa", description: "Black angus, cheddar, crema caramelizata, cartofi prajiti (400gr)", price: 58.00, categoryId: secondiCat!.id },
      { name: "Stinco di Maiale e Patate al Forno", description: "Rasol italian de porc, cartofi, sos de hrean (520gr)", price: 59.00, categoryId: secondiCat!.id },

      // Specialita di Carne
      { name: "Muschi de Vita Maturat (Irlanda)", description: "Muschi de vita maturat, legume la tigaie, ciuperci (510gr)", price: 110.00, categoryId: specCarneCat!.id, isFeatured: true },
      { name: "Tagliata di Manzo con Rucola e Grana Padano", description: "Vita, rucola, Grana Padano (350gr)", price: 90.00, categoryId: specCarneCat!.id },
      { name: "Picanha di Manzo, Patate al Forno e Peperoni", description: "Picanha de vita, cartofi, ardei copci (580gr)", price: 90.00, categoryId: specCarneCat!.id },
      { name: "Arrosticini din Carne de Oaie", description: "Carne de oaie, cartofi prajiti, sos Petra's (400gr)", price: 70.00, categoryId: specCarneCat!.id },

      // Specialita di Mare
      { name: "Zuppa di Cozze", description: "Supa de midii (420gr)", price: 54.00, categoryId: specMareCat!.id },
      { name: "Frittura Mista di Mare Napoletana", description: "Caracatita, creveti, peste, calamari (800gr / 6 pers)", price: 149.00, categoryId: specMareCat!.id },
      { name: "Gamberi alla Griglia", description: "Creveti la gratar (320gr)", price: 40.00, categoryId: specMareCat!.id },
      { name: "File Dorada la Cuptor", description: "Dorada la cuptor cu cartofi/broccoli (450gr)", price: 59.00, categoryId: specMareCat!.id },
      { name: "Pasta alla Luciana", description: "Baby caracatita, capere, masline taggiasche (350gr)", price: 55.00, categoryId: specMareCat!.id },

      // Pizza
      { name: "Pizza Margherita", description: "Aluat 3 cereali, sos de rosii, mozzarella, busuioc (460gr)", price: 39.00, categoryId: pizzaCat!.id },
      { name: "Pizza Prosciutto Cotto e Funghi", description: "Prosciutto cotto, ciuperci (460gr)", price: 50.00, categoryId: pizzaCat!.id },
      { name: "Pizza Salame Napoli", description: "Salame napoletan (400gr)", price: 39.00, categoryId: pizzaCat!.id },
      { name: "Pizza Marinara e Grana Padano", description: "Aluat marinat, sos de rosii, ulei de masline (460gr)", price: 54.00, categoryId: pizzaCat!.id },
      { name: "Pizza Quattro Formaggi", description: "Mozzarella, brie, gorgonzola, Grana Padano (480gr)", price: 39.00, categoryId: pizzaCat!.id, isFeatured: true },

      // Desert
      { name: "Tiramisu", description: "Tiramisu clasic italian", price: 35.00, categoryId: desertCat!.id },
      { name: "Panna Cotta", description: "Panna cotta cu sos de fructe", price: 35.00, categoryId: desertCat!.id },
      { name: "Tortino al Cioccolatto", description: "Tort de ciocolata cald", price: 35.00, categoryId: desertCat!.id },
      { name: "Semifreddo al Pistacchio", description: "Semifreddo cu fistic", price: 35.00, categoryId: desertCat!.id },
      { name: "Papanasi", description: "Papanasii casei", price: 30.00, categoryId: desertCat!.id },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${products.count} products`);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@petras.ro" },
    update: {},
    create: {
      email: "admin@petras.ro",
      password: "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$somehash",
      name: "Admin Petra's",
      role: "ADMIN",
      phone: "+40 749 107 787",
      pin: "1234",
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Business hours (Petra's program)
  const hours = await prisma.businessHour.createMany({
    data: [
      { dayOfWeek: 1, openTime: "12:00", closeTime: "21:30", isClosed: false },
      { dayOfWeek: 2, openTime: "12:00", closeTime: "21:30", isClosed: false },
      { dayOfWeek: 3, openTime: "12:00", closeTime: "21:30", isClosed: false },
      { dayOfWeek: 4, openTime: "12:00", closeTime: "21:30", isClosed: false },
      { dayOfWeek: 5, openTime: "12:00", closeTime: "21:30", isClosed: false },
      { dayOfWeek: 6, openTime: "12:30", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 0, openTime: "09:00", closeTime: "18:00", isClosed: false },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${hours.count} business hours`);

  // Tables
  const tables = await prisma.table.createMany({
    data: [
      { tableNumber: "M1", capacity: 2, location: "interior" },
      { tableNumber: "M2", capacity: 2, location: "interior" },
      { tableNumber: "M3", capacity: 4, location: "interior" },
      { tableNumber: "M4", capacity: 4, location: "interior" },
      { tableNumber: "M5", capacity: 6, location: "interior" },
      { tableNumber: "M6", capacity: 8, location: "interior" },
      { tableNumber: "T1", capacity: 4, location: "terasa" },
      { tableNumber: "T2", capacity: 4, location: "terasa" },
      { tableNumber: "T3", capacity: 6, location: "terasa" },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${tables.count} tables`);

  // Settings
  const settings = await prisma.setting.createMany({
    data: [
      { key: "restaurantName", value: "La Trattoria Petra's" },
      { key: "address", value: "Strada Eremia Grigorescu nr. 2, Moinesti, Bacau" },
      { key: "phone", value: "+40 749 107 787" },
      { key: "email", value: "contact@petras.ro" },
      { key: "minOrder", value: "0" },
      { key: "deliveryEnabled", value: "false" },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${settings.count} settings`);

  console.log("Seeding completed for Petra's Restaurant!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
