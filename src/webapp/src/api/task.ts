import {PAGE_SIZE} from "../utils/contants";
import {CreateTask, Task} from "../utils/types";
import api, {throwIfUnauthorized} from "./api";

export async function createTask(farmId: number, task: CreateTask): Promise<void> {
    throwIfUnauthorized();
    if (!task.name || !task.userIds.length)
        throw new Error("Invalid fields. Try selecting at least one user and completing all fields.");

    await api.post("/task", task, {
        params: { farmId }
    });
}

export async function getFarmTasks(farmId: number, page: number): Promise<Task[]> {
    throwIfUnauthorized();
    const resp = await api.get("/task/farm", { params: {farmId, page, pageSize: PAGE_SIZE} });
    const tasks: Task[] = resp.data;
    tasks.forEach(task => {
        task.createdAt = new Date(task.createdAt);
        task.deadline = new Date(task.deadline);
    });
    return tasks; 
}
