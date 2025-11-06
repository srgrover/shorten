'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { deleteSlugSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const deleteSlug = async (values: z.infer<typeof deleteSlugSchema>) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to delete a slug",
    };
  }

  const { slug } = values;
  const slugDeleted = await prisma.slug.delete({
    where: {
      slug: slug,
      userId: session.user.id
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    slug: slugDeleted,
  }
}