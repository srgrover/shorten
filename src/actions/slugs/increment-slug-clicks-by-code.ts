'use server';

import prisma from "@/lib/prisma";

export const incrementSlugClicksByCode = async (code: string) => {
  await prisma.slug.update({
    where: {
      slug: code,
    },
    data: {
      clicks: {
        increment: 1
      }
    }
  });

  return {
    ok: true,
  }
}