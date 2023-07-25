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

interface BaseTask {
    name: string;
    description: string;
    important: boolean;
}

export interface CreateTask extends BaseTask {
    userIds: number[];
    deadline: string;
}

export interface Task extends BaseTask {
    id: number;
    createdAt: Date;
    deadline: Date;
}