/*
  Warnings:

  - You are about to drop the `Amenitlies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Amenitlies" DROP CONSTRAINT "Amenitlies_productId_fkey";

-- DropTable
DROP TABLE "Amenitlies";
