import { createContext, useContext, useEffect, useState } from "react";
import axios  from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
    authState?: {access_token: string | null; refresh_token: string | null; authenticated: boolean | null, loading?: boolean; };
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string, servicealias: string) => Promise<any>;
    onLogout?: () => Promise<any>;
};

const TOKEN_KEY = "my-token";
const REFRESH_KEY = "my-refresh_token";
const USER_KEY = "my-username";
export const API_URL =  process.env.EXPO_PUBLIC_BASE_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        access_token: string | null;
        refresh_token: string | null;
        username: string | null;
        authenticated: boolean | null ;
        loading?: boolean;
    }>({
        access_token: null,
        refresh_token: null,
        username: null,
        authenticated: null,
        loading: true,
    });

    useEffect(() => {
        setAuthState({ ...authState, loading: true });
        const loadToken = async () => {
            const access_token = await SecureStore.getItemAsync(TOKEN_KEY); 
            const refresh_token = await SecureStore.getItemAsync(REFRESH_KEY); 
            const username = await SecureStore.getItemAsync(USER_KEY); 
    
            if (access_token) {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${ API_URL}/framework/v1/users?username=${username}`,
                    headers: { 
                        'Authorization': `Bearer ${access_token}`,
                    }
                };
                const result = await axios(config);
                if (result.data.total > 0) {
                    setAuthState({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        username: username,
                        authenticated: true,
                        loading: false,
                    });
                } else {
                    let data = JSON.stringify({
                        "refresh_token": `${refresh_token}`,
                        "grant_type": "refresh_token"
                    });
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `${API_URL}/connect/token/`,
                        headers: { 
                            'Accept': 'application/json', 
                            'Content-Type': 'application/json'
                        },
                        data : data
                    };
                    const result = await axios(config);
                    if (result.data.access_token) {
                        setAuthState({
                            access_token: result.data.access_token, // Use the new access token
                            refresh_token: refresh_token,
                            username: username,
                            authenticated: true,
                            loading: false,
                        });
                    }
                }
            } 
        }
        loadToken();
        
    }, []);
    
    
    const register = async (username: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, { username, password });
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg}	
        }
    };

    const login = async (username: string, password: string, servicealias: string) => {
        
        let body = JSON.stringify({
            "grant_type": "password",
            "username": username,
            "password": password,
            "servicealias": servicealias
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_URL}/connect/token/`,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            data : body
        };

        try {
            const result = await axios(config);

            console.log("result:", result)

            setAuthState({
                access_token:result.data.access_token,
                refresh_token:result.data.refresh_token,
                username:username,
                authenticated: true,
                loading: false,
            });

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
            await SecureStore.setItemAsync(REFRESH_KEY, result.data.refresh_token);
            await SecureStore.setItemAsync(USER_KEY, username);

            return result;
        } catch (e) {
            console.log("error:", e)
            return {error: true, msg: (e as any).response.data.Message}	
        }
    };

    const logout = async () => {
        // Delete access_token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common["Authorization"] = "";

        // Reset auth state
        setAuthState({
            access_token: null,
            refresh_token: null,
            username:null,
            authenticated: false,
            loading : false
        });
    };
    
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};