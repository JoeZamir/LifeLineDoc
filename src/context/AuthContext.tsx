import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Role = "patient" | "doctor" | "ambulance" | null;

interface AuthContextType {
    role: Role;
    setRole: (r: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRoleState] = useState<Role>(null);

    // persist role in localStorage so refresh doesn't lose it
    useEffect(() => {
        const stored = localStorage.getItem("lifelinedoc_role");
        if (stored) {
            setRoleState(stored as Role);
        }
    }, []);

    const setRole = (r: Role) => {
        setRoleState(r);
        if (r) {
            localStorage.setItem("lifelinedoc_role", r);
        } else {
            localStorage.removeItem("lifelinedoc_role");
        }
    };

    return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};
