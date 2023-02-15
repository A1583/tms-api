/*
  Warnings:

  - You are about to drop the column `shippingFree` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingFree",
ADD COLUMN     "shippingFee" DECIMAL(65,30);
