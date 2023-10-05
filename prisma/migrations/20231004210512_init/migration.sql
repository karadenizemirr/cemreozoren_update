/*
  Warnings:

  - You are about to drop the column `productId` on the `Language` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_productId_fkey";

-- DropIndex
DROP INDEX "Language_productId_key";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "languageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
