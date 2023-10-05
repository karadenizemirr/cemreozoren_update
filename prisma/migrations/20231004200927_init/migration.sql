/*
  Warnings:

  - Made the column `productId` on table `Description` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Media` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "Description_productId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_productId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_productId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_productId_fkey";

-- AlterTable
ALTER TABLE "Description" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Detail" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
