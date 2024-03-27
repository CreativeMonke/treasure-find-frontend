import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Avatar, Typography } from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure you have @mui/icons-material installed
import "./navbar.css";
/*
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
} : {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params:{
    open : boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  })=> React.ReactNode;
}) {


}*/
function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 834);
  const location = useLocation();
  const isCurrent = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 834);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderMobileMenu = () => (
    <Drawer
      className="navDrower"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      anchor="left"
      size="sm"
    >
      <Box className="pageLinks">
        <Button variant="plain" className="navButton" component={Link} to="/">
          Home
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/poi"
          variant="plain"
        >
          Objectives
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/HuntTimeline"
          variant="plain"
        >
          MyTimeline
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/about"
          variant="plain"
        >
          About
        </Button>
      </Box>
    </Drawer>
  );
  
  const renderDesktopMenu = () => (
    <Box
      className="navBar"
      backgroundColor="background.body"
      sx={{
        "& .navButton": {
          minWidth: "max-content",
          boxShadow: "md",
        },
      }}
    >
      <Box className="profileMenu"></Box>
      <Box className="pageLinks">
        <Button
          className="navButton"
          component={Link}
          to="/"
          variant={isCurrent("/") ? "solid" : "plain"}
        >
          Home
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/poi"
          variant={isCurrent("/poi") ? "solid" : "plain"}
        >
          Objectives
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/HuntTimeline"
          variant={isCurrent("/HuntTimeline") ? "solid" : "plain"}
        >
          MyTimeline
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/about"
          variant={isCurrent("/about-support") ? "solid" : "plain"}
        >
          About
        </Button>
      </Box>
      <Box className="profileMenu">
        <Avatar>UN</Avatar>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobileView ? (
        <Box className="mobileTopIcon" backgroundColor="background.body">
          <IconButton size="lg" onClick={toggleDrawer} sx={{ zIndex: 1 }}>
            <MenuIcon />
          </IconButton>
          
          {renderMobileMenu()}
        </Box>
      ) : (
        renderDesktopMenu()
      )}
    </>
  );
}

export default NavBar;
