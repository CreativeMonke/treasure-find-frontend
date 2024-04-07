import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import PageStructureWithRouter from "./PageStructureWithRouter.tsx";
import { useDispatch } from "react-redux";
import { fetchLocations } from "../features/locations/locationSlice.js";
import { checkLogin } from "../features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
    dispatch(fetchLocations());
  }, [dispatch]);
  return (
    <CssVarsProvider defaultMode="system">
      <BrowserRouter>
        <PageStructureWithRouter />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
