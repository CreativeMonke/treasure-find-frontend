import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { initializeAuthState } from "../features/auth/authSlice.js";
import LinearProgress from "@mui/joy/LinearProgress";

function ProtectedRoute({ children, permissionLevel }) {
  console.log("protected", permissionLevel);

  const dispatch = useDispatch();
  const { isLoggedIn, status, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthState());
  }, [dispatch]);

  if (status === "loading") return <LinearProgress variant="plain" size="lg" />;

  if (!isLoggedIn) return <Navigate to="/landing" replace />;
  if (user[0].role < permissionLevel) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
