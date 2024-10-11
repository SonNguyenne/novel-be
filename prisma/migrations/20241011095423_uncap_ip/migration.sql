/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collabration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChapterToList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChapterToPaymentHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_productId_fkey";

-- DropForeignKey
ALTER TABLE "Collabration" DROP CONSTRAINT "Collabration_productId_fkey";

-- DropForeignKey
ALTER TABLE "Collabration" DROP CONSTRAINT "Collabration_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_productId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_productId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToList" DROP CONSTRAINT "_ChapterToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToList" DROP CONSTRAINT "_ChapterToList_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToPaymentHistory" DROP CONSTRAINT "_ChapterToPaymentHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToPaymentHistory" DROP CONSTRAINT "_ChapterToPaymentHistory_B_fkey";

-- DropForeignKey
ALTER TABLE "_ListToProduct" DROP CONSTRAINT "_ListToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToProduct" DROP CONSTRAINT "_ListToProduct_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Collabration";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "PaymentHistory";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Rate";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "View";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- DropTable
DROP TABLE "_ChapterToList";

-- DropTable
DROP TABLE "_ChapterToPaymentHistory";

-- DropTable
DROP TABLE "_ListToProduct";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'PROGRESS',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "chapterName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "users" INTEGER[],

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "birthdate" TIMESTAMP(3),
    "picture" TEXT,
    "password" TEXT,
    "money" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "refreshToken" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "classification" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "view" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER,
    "ip" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "view_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collabration" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collabration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_categoryToproduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_chapterTolist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_chapterTopayment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_listToproduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_productId_chapterNumber_key" ON "chapter"("productId", "chapterNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rate_createdBy_productId_key" ON "rate"("createdBy", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "view_userId_productId_key" ON "view"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "view_ip_productId_key" ON "view"("ip", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "collabration_userId_productId_key" ON "collabration"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "_categoryToproduct_AB_unique" ON "_categoryToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryToproduct_B_index" ON "_categoryToproduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_chapterTolist_AB_unique" ON "_chapterTolist"("A", "B");

-- CreateIndex
CREATE INDEX "_chapterTolist_B_index" ON "_chapterTolist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_chapterTopayment_AB_unique" ON "_chapterTopayment"("A", "B");

-- CreateIndex
CREATE INDEX "_chapterTopayment_B_index" ON "_chapterTopayment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_listToproduct_AB_unique" ON "_listToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_listToproduct_B_index" ON "_listToproduct"("B");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate" ADD CONSTRAINT "rate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate" ADD CONSTRAINT "rate_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collabration" ADD CONSTRAINT "collabration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collabration" ADD CONSTRAINT "collabration_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryToproduct" ADD CONSTRAINT "_categoryToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryToproduct" ADD CONSTRAINT "_categoryToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chapterTolist" ADD CONSTRAINT "_chapterTolist_A_fkey" FOREIGN KEY ("A") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chapterTolist" ADD CONSTRAINT "_chapterTolist_B_fkey" FOREIGN KEY ("B") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chapterTopayment" ADD CONSTRAINT "_chapterTopayment_A_fkey" FOREIGN KEY ("A") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chapterTopayment" ADD CONSTRAINT "_chapterTopayment_B_fkey" FOREIGN KEY ("B") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_listToproduct" ADD CONSTRAINT "_listToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_listToproduct" ADD CONSTRAINT "_listToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
