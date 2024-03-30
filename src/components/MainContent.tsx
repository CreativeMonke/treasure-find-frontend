import React from "react";
import Box from "@mui/joy/Box";
import { GlobalStyles } from "@mui/joy";
import routeConfig from "./Routes/routeConfig.js";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.tsx";

function MainContent() {
  const location = useLocation();
  const hideForRoutes = ["/login", "/register"];
  const shouldHideBox = hideForRoutes.includes(location.pathname);
  return !shouldHideBox ? (
    <Box 
      component="main"
      className="MainContent"
      boxSizing="border-box"
      sx={{
        backgroundColor: "background.body",
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(18px + var(--Header-height))",
          sm: "calc(18px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100vh", // corrected from "100dvh" to "100vh"
        gap: 1,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "42px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
            "--Sidebar-width": "256px",
          },
        })}
      />
      <Routes>
        {routeConfig.map((route, index) => {
          const Element = route.element;
          const routeElement = (
            <Layout>
              <Element />
            </Layout>
          );

          return (
            <Route
              key={index}
              path={route.path}
              element={route.protected ? <ProtectedRoute>{routeElement}</ProtectedRoute> : routeElement}
            />
          );
        })}
      </Routes>
    </Box>
  ) : (
    <Routes>
      {routeConfig.map((route, index) => {
        const Element = route.element;
        const routeElement = <Element />;
        return (
          <Route
            key={index}
            path={route.path}
            element={route.protected ? <ProtectedRoute>{routeElement}</ProtectedRoute> : routeElement}
          />
        );
      })}
    </Routes>
  );
}

export default MainContent;