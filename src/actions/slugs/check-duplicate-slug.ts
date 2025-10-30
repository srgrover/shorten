'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const checkDuplicateSlug = async (slug: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to check a slug",
    };
  }

  const slugFound = await prisma.slug.findUnique({
    where: {
      slug
    },
  });

  return {
    ok: true,
    duplicate: slugFound !== null,
  }
}