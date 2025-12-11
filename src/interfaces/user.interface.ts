import { Suscription } from "./suscription.interface";

export interface User {
    id: string;
    image: string | null;
    name: string | null;
    email: string | null;
    password: string;
    emailVerified: Date | null;
    suscriptionId: string;
    suscription: Suscription;
}
