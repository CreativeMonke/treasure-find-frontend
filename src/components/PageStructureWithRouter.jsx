import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar/Navbar.jsx";
import MainContent from "./MainContent";
import { useSelector } from "react-redux";
import AlertBox from "./General/AlertBox.jsx";

function PageStructureWithRouter() {
  const location = useLocation();
  const singleBodyPages = ["/login", "/register", "/landing" , "/verifyEmail","/docs/support"];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!singleBodyPages.includes(location.pathname) && isLoggedIn && <NavBar />}
      <MainContent />
      <AlertBox />
    </>
  );
}

export default PageStructureWithRouter;
