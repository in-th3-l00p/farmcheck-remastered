export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type FarmRole = "WORKER" | "ADMIN" | "OWNER";

export interface FarmUser extends User {
    role: FarmRole;
}

export interface Farm {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}