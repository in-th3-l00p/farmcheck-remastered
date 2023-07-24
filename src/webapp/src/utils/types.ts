export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Farm {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}