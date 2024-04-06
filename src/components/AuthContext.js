import Cookies from "js-cookie";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const AuthContext = createContext(null);
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (!isLoggedIn)
            checkLogin();

    }, []);

    const login = () => {
        setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false);
        Cookies.remove("SessionId");
    }

    async function checkLogin() {
        try {
            const data = await axios.get(`${apiUrl}auth/checkLoggedIn`,
                {
                    withCredentials: true,
                })
            console.log(data);
            if (data.status === 200) {
                setIsLoggedIn(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const value = { isLoggedIn, login, logout, checkLogin };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
