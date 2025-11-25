'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { checkDuplicateSlug } from "./check-duplicate-slug";
import z from "zod";
import { createSlugSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { Tag } from "@prisma/client";

export const createNewSlug = async (values: z.infer<typeof createSlugSchema>, tags: Tag[]) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to create a slug",
    };
  }

  const { slug } = values;
  const {ok, duplicate} = await checkDuplicateSlug(slug)
  if (!ok) return { ok: false, message: 'Something went wrong checking slug'}
  if (duplicate) return { ok: false, message: 'Slug already exists'}

  const slugInsert = await prisma.slug.create({
    data: {
      ...values,
      userId: session.user.id,

      Tags: {
        // 'connect' puede recibir un array para conectar múltiples registros
        connect: tags.map((tag) => ({ id: tag.id })), // Asumiendo que 'tagIds' es un array de strings
      },
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    slug: slugInsert,
  }
}