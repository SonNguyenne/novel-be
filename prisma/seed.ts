// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const numberRecords = 10;

  for (let i = 0; i < numberRecords; i++) {
    // Category
    await prisma.category.create({
      data: {
        name: faker.lorem.sentence({ min: 2, max: 5 }),
        description: faker.lorem.sentence(),
      },
    });

    // User
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
        money: parseFloat(faker.finance.amount(100, 10000, 2)),
      },
    });

    const allUsers = await prisma.user.findMany();
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

    const allCategories = await prisma.category.findMany();
    const randomCategories = faker.helpers
      .shuffle(allCategories)
      .slice(0, faker.number.int({ max: 5 }));

    // Product
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        source: faker.internet.url(),
        image: faker.image.url(),
        status: faker.helpers.arrayElement(['PROGRESS', 'DONE']),
        price: parseFloat(faker.finance.amount(10, 100, 2)),
        authorName: faker.person.fullName(),
        viewCount: faker.number.int({ max: 10000 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: {
          connect: randomCategories.map((category) => ({ id: category.id })),
        },
        userId: randomUser.id,
      },
    });

    const allProducts = await prisma.product.findMany();
    const randomProduct =
      allProducts[Math.floor(Math.random() * allProducts.length)];

    // Comment
    await prisma.comment.create({
      data: {
        userId: randomUser.id,
        productId: randomProduct.id,
        content: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Rate
    await prisma.rate.create({
      data: {
        userId: randomUser.id,
        productId: randomProduct.id,
        rating: faker.number.int({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Chapter
    const maxChapter = await prisma.chapter.findFirst({
      where: {
        productId: randomProduct.id,
      },
      orderBy: {
        chapterNumber: 'desc',
      },
    });
    await prisma.chapter.create({
      data: {
        productId: randomProduct.id,
        chapterName: faker.lorem.words(),
        content: faker.lorem.paragraphs({ min: 100, max: 150 }, '<br/>\n'),
        chapterNumber: (maxChapter?.chapterNumber || 0) + 1, // faker.number.int({ min: 1, max: 1000 })
      },
    });

    // Reading
    const allChapters = await prisma.chapter.findMany();
    const randomChapters = faker.helpers
      .shuffle(allChapters)
      .slice(0, faker.number.int({ max: 5 }));

    await prisma.reading.create({
      data: {
        userId: randomUser.id,
        chapters: {
          connect: randomChapters.map((chapter) => ({ id: chapter.id })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Favorite
    const allFavorites = await prisma.favorite.findMany();
    const randomFavorites = faker.helpers
      .shuffle(allFavorites)
      .slice(0, faker.number.int({ max: 5 }));

    await prisma.favorite.create({
      data: {
        userId: randomUser.id,
        chapters: {
          connect: randomFavorites.map((favorite) => ({ id: favorite.id })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // PaymentHistory
    await prisma.paymentHistory.create({
      data: {
        userId: randomUser.id,
        money: parseFloat(faker.finance.amount(100, 10000, 2)),
        createdAt: new Date(),
        chapters: {
          connect: randomFavorites.map((favorite) => ({ id: favorite.id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
