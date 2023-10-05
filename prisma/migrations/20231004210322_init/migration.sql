-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_languageId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "languageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
