/*
  Warnings:

  - You are about to drop the `Logistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_logistic_id_fkey";

-- DropTable
DROP TABLE "Logistics";

-- DropTable
DROP TABLE "Orders";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "logistic_id" INTEGER NOT NULL,
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

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" VARCHAR(50),
    "updated_by" VARCHAR(50),

    CONSTRAINT "logistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_tracking_number_key" ON "orders"("tracking_number");

-- CreateIndex
CREATE INDEX "orders_logistic_id_tracking_number_created_at_current_statu_idx" ON "orders"("logistic_id", "tracking_number", "created_at", "current_status");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_code_key" ON "logistics"("code");

-- CreateIndex
CREATE INDEX "logistics_code_active_idx" ON "logistics"("code", "active");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_logistic_id_fkey" FOREIGN KEY ("logistic_id") REFERENCES "logistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
