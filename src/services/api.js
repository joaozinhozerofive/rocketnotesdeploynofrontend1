import axios from "axios";


export const api = axios.create({
    baseURL: "https://rocketnotesdeploy-api.onrender.com",
})