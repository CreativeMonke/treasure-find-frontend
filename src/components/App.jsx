import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import POI from "./pages/POI";
import NavBar from "./Navbar/Navbar";
import Footer from "./Footer";
import About from "./pages/About"
import HuntTimeline from "./pages/HuntTimeline";
import LoginPage from "./pages/Login/Login"
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return (
    <CssVarsProvider
    defaultMode="system">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/poi"
          element={
            <Layout>
              <POI />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/HuntTimeline"
          element={
            <Layout>
              <HuntTimeline />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
      </Routes>
      <Footer className="footer" />
    </BrowserRouter>
    </CssVarsProvider>
  );
}

function Layout({ children }) {
  return <>{children}</>;
}

export default App;
