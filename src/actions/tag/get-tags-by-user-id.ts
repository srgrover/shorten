'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getTagsByUserId = async (userId?: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be logged in to view your tags",
    };
  }

  const tags = await prisma.tag.findMany({
    where: {
      creatorId: userId !== undefined ? userId : session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return {
    ok: true,
    tags: tags || [],
  }
}