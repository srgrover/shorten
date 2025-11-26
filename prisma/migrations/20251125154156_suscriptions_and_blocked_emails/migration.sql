-- AlterTable
ALTER TABLE "User" ADD COLUMN     "suscriptionId" TEXT;

-- CreateTable
CREATE TABLE "Suscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "limitLinks" INTEGER NOT NULL,
    "limitTags" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "specialPrice" DECIMAL(65,30),
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Suscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedUserEmails" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "BlockedUserEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockedUserEmails_email_key" ON "BlockedUserEmails"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_suscriptionId_fkey" FOREIGN KEY ("suscriptionId") REFERENCES "Suscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
