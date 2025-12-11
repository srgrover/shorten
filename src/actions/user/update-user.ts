'use server';

import prisma from "@/lib/prisma";
import { User } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const updateUser = async (user: User) => {
  if (!user) {
    return {
      ok: false,
      message: "There is no user to update.",
    };
  }

  const userUpdated = await prisma.user.update({
    where: {
      email: user.email!,
      id: user.id
    },
    data: {
      name: user.name,
      suscriptionId: user.suscriptionId,
    }
  });

  revalidatePath("/suscriptions");

  return {
    ok: true,
    user: userUpdated
  }
}