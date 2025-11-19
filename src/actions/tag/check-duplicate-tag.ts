'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const checkDuplicateTag = async (tag: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to check a tag",
    };
  }

  const tagFound = await prisma.tag.findFirst({
    where: {
      creatorId: session.user.id!,
      name: tag
    },
  });

  return {
    ok: true,
    duplicate: tagFound !== null,
  }
}