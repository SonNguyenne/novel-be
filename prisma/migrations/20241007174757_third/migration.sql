/*
  Warnings:

  - You are about to drop the column `test` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "test";
