/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `currentStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerProvince` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingFee` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shopProvince` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `trackingNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tracking_number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tracking_number` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_trackingNumber_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
DROP COLUMN "currentStatus",
DROP COLUMN "customerProvince",
DROP COLUMN "deletedAt",
DROP COLUMN "shippingFee",
DROP COLUMN "shopProvince",
DROP COLUMN "trackingNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_status" TEXT,
ADD COLUMN     "customer_province" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "shipping_fee" DECIMAL(65,30),
ADD COLUMN     "shop_province" TEXT,
ADD COLUMN     "tracking_number" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_tracking_number_key" ON "Order"("tracking_number");
