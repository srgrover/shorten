/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SlugToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tags" DROP CONSTRAINT "Tags_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SlugToTags" DROP CONSTRAINT "_SlugToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SlugToTags" DROP CONSTRAINT "_SlugToTags_B_fkey";

-- DropTable
DROP TABLE "public"."Tags";

-- DropTable
DROP TABLE "public"."_SlugToTags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SlugToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SlugToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Tag_creatorId_idx" ON "Tag"("creatorId");

-- CreateIndex
CREATE INDEX "_SlugToTag_B_index" ON "_SlugToTag"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlugToTag" ADD CONSTRAINT "_SlugToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Slug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlugToTag" ADD CONSTRAINT "_SlugToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
