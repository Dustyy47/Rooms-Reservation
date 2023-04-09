-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('FULLFILLED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
