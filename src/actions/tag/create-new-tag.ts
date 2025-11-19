'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import z from "zod";
import { revalidatePath } from "next/cache";
import { checkDuplicateTag } from "./check-duplicate-tag";
import { createTagSchema } from "@/schemas";

export const createNewTag = async (values: z.infer<typeof createTagSchema>) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to create a tag",
    };
  }

  const { name } = values;
  const {ok, duplicate} = await checkDuplicateTag(name)
  if (!ok) return { ok: false, message: 'Something went wrong checking slug'}
  if (duplicate) return { ok: false, message: 'Tag already exists'}

  const tagInsert = await prisma.tag.create({
    data: {
      ...values,
      createdAt: new Date(),
      creatorId: session.user.id!,
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    tag: tagInsert,
  }
}