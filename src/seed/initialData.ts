
export type SlugSeed = {
    id?: string
    slug: string
    url: string
    clicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

export const seedSlugs: SlugSeed[] = [
    {
        id: crypto.randomUUID(),
        slug: 'rygeas',
        url: 'https://jonathanmoya.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 36
    },
    {
        id: crypto.randomUUID(),
        slug: 'sderfg',
        url: 'https://google.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 36
    },
    {
        id: crypto.randomUUID(),
        slug: 'vfdgtr',
        url: 'https://youtube.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 36
    },
    {
        id: crypto.randomUUID(),
        slug: 'dfesdc',
        url: 'https://vercel.app',
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 36
    },
]