import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const [isWaitingForLoginCheck, setIsWaitingForLoginCheck] = useState(true);
  const { isLoggedIn, checkLogin } = useContext(AuthContext);
  useEffect(() => {
    async function VerifyLogin() {
      if (!isLoggedIn) await checkLogin();

      setIsWaitingForLoginCheck(false);
    }

    VerifyLogin();
  },[isLoggedIn, checkLogin]);
  
  if(isWaitingForLoginCheck) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
