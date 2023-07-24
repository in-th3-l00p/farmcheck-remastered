import api from "./api";
import {Farm} from "../utils/types";
import {AxiosError} from "axios";

export async function getFarms(page: number = 0) {
    if (!localStorage.getItem("token"))
        throw new Error("UNAUTHORIZED");
    const resp = await api.get("/farm/all", { params: { page } });
    const farms = resp.data as Farm[];
    farms.forEach(farm => farm.createdAt = new Date(farm.createdAt));
    return farms;
}

export async function createFarm(name: string, description: string) {
    if (!localStorage.getItem("token"))
        throw new Error("UNAUTHORIZED");
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