/*
  Warnings:

  - You are about to drop the column `logisticId` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `logistic_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_logisticId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "logisticId",
ADD COLUMN     "logistic_id" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_logistic_id_fkey" FOREIGN KEY ("logistic_id") REFERENCES "Logistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
