'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
// import { checkDuplicateSlug } from "./check-duplicate-slug";
// import z from "zod";
// import { createSlugSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { Slug } from "@/interfaces";

export const updateSlug = async (updated: Slug) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to update a slug",
    };
  }

  // TODO: Do this when the slug short link was changed
  // const { slug } = values;
  // const {ok, duplicate} = await checkDuplicateSlug(slug)
  // if (!ok) return { ok: false, message: 'Something went wrong checking slug'}
  // if (duplicate) return { ok: false, message: 'Slug already exists'}

  try {
    const slugUpdated = await prisma.slug.update({
      where: {
        id: updated.id
      },
      data: {
        ...updated,
      }
    });

    revalidatePath("/dashboard");
  
    return {
      ok: true,
      slug: slugUpdated,
    }
  } catch (ex) {
    return {
      ok: false,
      message: "Something went wrong updating the slug. Please try again",
    };
  }
}