'use server';

import { auth } from "@/auth.config";
import { Slug } from "@/interfaces/slug.interface";
import prisma from "@/lib/prisma";

export const getSlugsByUser = async () => {
  const session = await auth();
  //const testId = 'db6b4051-370a-44e7-8126-eda1089c974d'
  const testId = 'd80634fd-b228-4129-af30-d96a8af0a7d5'

  // if (!session?.user) {
  //   return {
  //     ok: false,
  //     message: "Debe iniciar sesión para poder ver sus enlaces",
  //   };
  // }

  const slugs = await prisma.slug.findMany({
    where: {
      userId: testId //?? session.user.id,
    },
    include: {
      user: true,
    },
  }) as Slug[];

  return {
    ok: true,
    slugs: slugs,
  }
}