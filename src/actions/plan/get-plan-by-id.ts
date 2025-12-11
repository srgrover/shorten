'use server';

import prisma from "@/lib/prisma";

export const getPlanById = async (id: string) => {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id }
    });
  
    return {
      ok: true,
      suscriptions: plan,
    }
  } catch (e) {
    return {
      ok: false,
      error: e,
    }
  }
}