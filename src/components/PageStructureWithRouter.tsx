import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar/Navbar.tsx";
import MainContent from "./MainContent.tsx";

function PageStructureWithRouter() {
  const location = useLocation();
  const singleBodyPages = ["/login", "/register"];
  console.log(location);
  return (
    <>
      {!singleBodyPages.includes(location.pathname) && <NavBar />}
      <MainContent />
    </>
  );
}

export default PageStructureWithRouter;
