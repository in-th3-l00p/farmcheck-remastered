import {User} from "../utils/types";
import api from "./api";

export async function getUser(username: string): Promise<User> {
    const resp = await api.get("/user/" + username);
    return resp.data;
}