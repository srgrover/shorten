'use server';

import prisma from "@/lib/prisma";

export const getSlugByCode = async (code: string) => {
  const slug = await prisma.slug.findUnique({
    where: {
      slug: code,
    }
  });

  return {
    ok: true,
    slug: slug || null,
  }
}