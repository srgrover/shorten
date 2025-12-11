'use server';

import prisma from "@/lib/prisma";

export const getAllSuscriptions = async () => {
  const suscriptions = await prisma.plan.findMany({
    orderBy: {
      price: "asc",
    }
  });

  return {
    ok: true,
    suscriptions: suscriptions || [],
  }
}