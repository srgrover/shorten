'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getSlugsByUserId = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe iniciar sesión para poder ver sus órdenes",
    };
  }

  console.log(session)

  const slugs = await prisma.slug.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    // include: {
    //   user: true,
    // },

  });

  return {
    ok: true,
    slugs: slugs || [],
  }
}