import { createContext, useEffect, useState } from "react";

// 1️⃣ Create Context
export const AuthContext = createContext();
const url = import.meta.env.VITE_BACKEND_HOST_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 2️⃣ Load user from localStorage when the app starts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile(token);
        }
    }, []);

    // 3️⃣ Function to fetch user profile
    const fetchUserProfile = async (token) => {
        try {
            const res = await fetch(`${url}/api/user/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            console.log("Profile fetched:", data);
            if (data.success) {
                setUser(data.user);
            } else {
                logout(); // ✅ Logout user if token is invalid
            }
        } catch (error) {
            console.error("Error fetching profile", error);
            logout(); // ✅ Ensure user logs out on error
        }
    };

    // 4️⃣ Login function
    const login = (token) => {
        localStorage.setItem("token", token);
        fetchUserProfile(token);
    };

    // 5️⃣ Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};