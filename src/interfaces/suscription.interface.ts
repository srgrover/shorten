export interface Suscription {
    id: string;
    name: string;
    limitLinks: number;
    limitTags: number;
    price: number
    specialPrice?: number;
    description: string;
    createdAt: Date;
    creatorId: string;
}
