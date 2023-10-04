/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "categoryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Language_categoryId_key" ON "Language"("categoryId");

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
