/*
  Warnings:

  - A unique constraint covering the columns `[short]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "short" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_short_key" ON "Language"("short");
