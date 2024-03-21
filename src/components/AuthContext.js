import Cookies from "js-cookie";
import React , {useState,useEffect, createContext} from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const cookieUserId = Cookies.get("sessionid");
        setIsLoggedIn(cookieUserId !== undefined);

    },[]);

    const login = () => {
        setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false);
        Cookies.remove("sessionid");
    }

    const value = {isLoggedIn,login,logout};
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};