'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getTagById } from "./get-tag-by-id";

export const deleteTag = async (tagId: string) => {
  const session = await auth();
  
  if (!session?.user) {
    return {
      ok: false,
      message: "Should be logged in to delete a tag",
    };
  }

  const { tag } = await getTagById(tagId);
  if (!tag) return { ok: false, message: 'Tag not found'}
  if (tag.creatorId !== session.user.id) return { ok: false, message: 'You are not the creator of this tag'}

  const tagDeleted = await prisma.tag.delete({
    where: {
      id: tagId,
      creatorId: session.user.id
    }
  });

  revalidatePath("/dashboard");

  return {
    ok: true,
    tag: tagDeleted,
  }
}