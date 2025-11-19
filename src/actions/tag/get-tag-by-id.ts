'use server';

import prisma from "@/lib/prisma";

export const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUnique({
    where: { id }
  });

  return {
    ok: true,
    tag: tag || null,
  }
}