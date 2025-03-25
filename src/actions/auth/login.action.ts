'use server';

import { signIn } from "@/auth.config";

export const login = async (provider: string) => {
  await signIn(provider);
};