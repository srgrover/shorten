'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { checkDuplicateSlug } from "./check-duplicate-slug";
import z from "zod";
import { createSlugSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const createNewSlug = async (values: z.infer<typeof createSlugSchema>) => {
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
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    slug: slugInsert,
  }
}