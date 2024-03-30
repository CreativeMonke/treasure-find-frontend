import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import PageStructureWithRouter from "./PageStructureWithRouter.tsx";

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <BrowserRouter>
        <PageStructureWithRouter />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
