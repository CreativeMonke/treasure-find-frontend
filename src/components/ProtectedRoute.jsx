import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { initializeAuthState } from "../features/auth/authSlice.js";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);
  
  if (status === 'loading') return null; // or a loading spinner

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
