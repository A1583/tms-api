-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "trackingNumber" VARCHAR(50) NOT NULL,
    "customerProvince" TEXT,
    "shopProvince" TEXT,
    "currentStatus" TEXT,
    "shippingFree" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "total" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_trackingNumber_key" ON "Order"("trackingNumber");
