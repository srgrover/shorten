export interface User {
    id: string;
    image: string | null;
    name: string | null;
    email: string | null;
    role: string;
    password?: string | null;
    emailVerified: Date | null;
}
