import {createContext, useEffect, useState} from 'react';
import {User} from '../utils/types';
import api from '../api/api';

export interface AuthContextType {
    token: string | null;
    user: User | null;
}

export function useAuthContext(): AuthContextType {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            api.get("/user")
                .then(resp => setUser(resp.data))
                .catch(() => localStorage.removeItem("token"));
            setToken(token);
        }
    }, []); 

    return { token, user };
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;