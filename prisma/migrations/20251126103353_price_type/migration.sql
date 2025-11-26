/*
  Warnings:

  - You are about to alter the column `price` on the `Suscription` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `specialPrice` on the `Suscription` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Suscription" ALTER COLUMN "price" SET DEFAULT 6.99,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "specialPrice" SET DEFAULT 0,
ALTER COLUMN "specialPrice" SET DATA TYPE DOUBLE PRECISION;
