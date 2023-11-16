import axios from "axios";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: {'Authorization': process.env.EXPO_PUBLIC_API_KEY}
});