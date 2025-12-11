/*
  Warnings:

  - You are about to drop the `Suscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_suscriptionId_fkey";

-- DropTable
DROP TABLE "public"."Suscription";

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "limitLinks" INTEGER NOT NULL,
    "limitTags" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 6.99,
    "specialPrice" DOUBLE PRECISION DEFAULT 0,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_suscriptionId_fkey" FOREIGN KEY ("suscriptionId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
