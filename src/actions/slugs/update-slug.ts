'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
// import { checkDuplicateSlug } from "./check-duplicate-slug";
// import z from "zod";
// import { createSlugSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { Slug } from "@prisma/client";

export const updateSlug = async (slug: Slug) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to update a slug",
    };
  }

  // const {ok, duplicate} = await checkDuplicateSlug(slug)
  // if (!ok) return { ok: false, message: 'Something went wrong checking slug'}
  // if (duplicate) return { ok: false, message: 'Slug already exists'}

  const slugUpdated = await prisma.slug.update({
    where: {
      id: slug.id
    },
    data: {
      ...slug,
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    slug: slugUpdated,
  }
}