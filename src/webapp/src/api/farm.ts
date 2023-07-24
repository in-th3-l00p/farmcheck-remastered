import api, {throwIfUnauthorized} from "./api";
import {Farm, FarmRole, FarmUser} from "../utils/types";
import {AxiosError} from "axios";
import {PAGE_SIZE} from "../utils/contants";

export async function getFarms(page: number = 0) {
    throwIfUnauthorized();
    const resp = await api.get("/farm/all", { params: { page } });
    const farms = resp.data as Farm[];
    farms.forEach(farm => farm.createdAt = new Date(farm.createdAt));
    return farms;
}

export async function createFarm(name: string, description: string) {
    throwIfUnauthorized();
    if (!name)
        throw new Error("All fields should be completed.");
    try {
        const resp = await api.post("/farm", { name, description });
        return resp.data as Farm;
    } catch (err) {
        if (err instanceof AxiosError)
            throw new Error(err.response?.data["message"]);
    }
}

export async function getFarm(id: number) {
    throwIfUnauthorized();
    const resp = await api.get("/farm", {params: {farmId: id}});
    const farm = resp.data as Farm;
    farm.createdAt = new Date(farm.createdAt);
    return farm;
}

export async function getFarmUsers(farmId: number, page: number): Promise<FarmUser[]> {
    throwIfUnauthorized();
    const resp = await api.get("/farm/users", {params: {farmId, page, pageSize: PAGE_SIZE}});
    return resp.data;
}

export async function updateUserRole(farmId: number, userId: number, role: FarmRole) {
    throwIfUnauthorized();
    await api.put("/farm/user", {}, {params: {farmId, userId, role}});
}