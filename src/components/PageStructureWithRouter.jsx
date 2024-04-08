import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar/Navbar.jsx";
import MainContent from "./MainContent.tsx";
import { useSelector } from "react-redux";

function PageStructureWithRouter() {
  const location = useLocation();
  const singleBodyPages = ["/login", "/register"];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(location);
  return (
    <>
      {!singleBodyPages.includes(location.pathname) && isLoggedIn && <NavBar />}
      <MainContent />
    </>
  );
}

export default PageStructureWithRouter;
