import axios from "axios";

const api = axios.create({
    baseURL: "http://172.30.176.1:8080"
})

export default api;