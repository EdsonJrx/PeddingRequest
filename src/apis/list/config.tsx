import axios, { AxiosInstance } from "axios";

interface ApiInstance {
    api: AxiosInstance;
    setAuthToken: (token: string | null | undefined ) => void;
}

export function createApiInstance(config: any): ApiInstance {
    const api = axios.create(config);

    return {
        api,
        setAuthToken: function(token: string | null | undefined ) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    };
}