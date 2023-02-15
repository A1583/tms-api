/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "logisticId" INTEGER NOT NULL,
    "tracking_number" VARCHAR(50) NOT NULL,
    "customer_province" TEXT,
    "shop_province" TEXT,
    "current_status" TEXT,
    "shipping_fee" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "total" DECIMAL(65,30),
    "created_by" VARCHAR(50),
    "updated_by" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logistics" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" VARCHAR(50),
    "updated_by" VARCHAR(50),

    CONSTRAINT "Logistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_tracking_number_key" ON "Orders"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "Logistics_code_key" ON "Logistics"("code");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_logisticId_fkey" FOREIGN KEY ("logisticId") REFERENCES "Logistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
