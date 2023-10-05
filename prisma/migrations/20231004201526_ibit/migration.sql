-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_productId_fkey";

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
