/*
  Warnings:

  - You are about to drop the `PromoCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `promoCode` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PromoCode" DROP CONSTRAINT "PromoCode_userId_fkey";

-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "promoCode" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "PromoCode";

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
