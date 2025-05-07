import bcryptjs from "bcryptjs";

export type SeedSlug = {
  id?: string;
  slug: string;
  url: string;
  clicks?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

interface SeedData {
  users: SeedUser[];
  slugs: SeedSlug[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "usuario1@google.es",
      password: bcryptjs.hashSync("123456"),
      name: "User Primero",
      role: "user",
    },
    {
        email: "usuario2@google.es",
        password: bcryptjs.hashSync("123456"),
        name: "User segundo",
        role: "admin",
      },
  ],
  slugs: [
    {
      id: crypto.randomUUID(),
      slug: "rygeas",
      url: "https://jonathanmoya.is-a.dev",
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 36,
    },
    {
      id: crypto.randomUUID(),
      slug: "sderfg",
      url: "https://google.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 36,
    },
    {
      id: crypto.randomUUID(),
      slug: "vfdgtr",
      url: "https://youtube.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 36,
    },
    {
      id: crypto.randomUUID(),
      slug: "dfesdc",
      url: "https://vercel.app",
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 36,
    },
  ],
};

