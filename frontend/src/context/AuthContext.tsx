
import { createContext, ReactNode, useState, useEffect } from "react";
import React from "react";

interface UserDetails {
    name: string;
    email: string;
    id: string;
}

export interface UserContext {
    user: UserDetails | null;
    setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

export const AuthContext = createContext<UserContext>({
    user: null,
    setUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
