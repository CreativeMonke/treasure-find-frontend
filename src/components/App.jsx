import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import NavBar from "./Navbar/Navbar";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import routeConfig from "./Routes/routeConfig.js"; // Adjust the path as necessary

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <BrowserRouter>
        <PageStructure>
          <Routes>
            {routeConfig.map((route, index) => {
              const Element = route.element;
              const RouteComponent = route.protected ? (
                <ProtectedRoute>
                  <Element />
                </ProtectedRoute>
              ) : (
                <Element />
              );

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Layout>{RouteComponent}</Layout>}
                />
              );
            })}
          </Routes>
        </PageStructure>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

function Layout({ children }) {
  return <>{children}</>;
}

function PageStructure({ children }) {
  let location = useLocation();
  const noNavBarFooterPages = ["/login", "/register"]; // Add paths where NavBar and Footer should not be rendered

  return (
    <>
      {!noNavBarFooterPages.includes(location.pathname) && <NavBar />}
      {children}
      {!noNavBarFooterPages.includes(location.pathname) && (
        <Footer className="footer" />
      )}
    </>
  );
}

export default App;
