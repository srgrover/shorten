export interface Slug {
    id: string;
    slug: string;
    url: string;
    description: string | null;
    clicks: number;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
    tags: string[]
}