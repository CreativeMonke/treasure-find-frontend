import React from "react";
import Box from "@mui/joy/Box";
import { GlobalStyles, useTheme } from "@mui/joy";
import routeConfig from "./Routes/routeConfig.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.tsx";

function MainContent() {
  const location = useLocation();
  const hideForRoutes = [
    "/login",
    "/register",
    "/verifyEmail",
    "/docs/support",
    "/landing",
  ];
  const shouldHideBox = hideForRoutes.includes(location.pathname);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";
  return !shouldHideBox ? (
    <Box
      component="main"
      className="MainContent"
      boxSizing="border-box"
      maxHeight="100vh"
      sx={{
        backgroundColor: "background.body",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        px: { xs: 2, md: 3 },
        pt: {
          xs: "calc(22px + var(--Header-height))",
          sm: "calc(24px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
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
              element={
                route.protected ? (
                  <ProtectedRoute permissionLevel={route.permissionLevel}>
                    {routeElement}
                  </ProtectedRoute>
                ) : (
                  routeElement
                )
              }
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
            element={
              route.protected ? (
                <ProtectedRoute>{routeElement}</ProtectedRoute>
              ) : (
                routeElement
              )
            }
          />
        );
      })}
    </Routes>
  );
}

export default MainContent;
