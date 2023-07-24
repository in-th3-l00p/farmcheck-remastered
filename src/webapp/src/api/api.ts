import axios from "axios";

export function throwIfUnauthorized() {
    if (!localStorage.getItem("token"))
        throw new Error("UNAUTHORIZED");
}

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 1000,
    headers: localStorage.getItem("token") ? {
        "Authorization": "Bearer " + localStorage.getItem("token")
    } : {}
});

export default api;