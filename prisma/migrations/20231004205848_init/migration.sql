/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Language` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_categoryId_fkey";

-- DropIndex
DROP INDEX "Language_categoryId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
