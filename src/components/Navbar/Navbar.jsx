import React from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Avatar } from "@mui/joy";
import "./navbar.css";
function NavBar() {
  const location = useLocation();
  const isCurrent = (path) => location.pathname === path;

  return (
    <Box
      className="navBar"
      backgroundColor="background.body"
      sx={{
        "& .navButton": {
          minWidth: "100px",
          boxShadow: "md",
        },
      }}
    >
      <Box className = "profileMenu"></Box>
      <Box className = "pageLinks">
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
          Locations
        </Button>
        <Button
          className="navButton"
          component={Link}
          to="/HuntTimeline"
          variant={isCurrent("/HuntTimeline") ? "solid" : "plain"}
        >
          My Hunt
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
      <Box className = "profileMenu">
        <Avatar>UN</Avatar>
      </Box>
    </Box>
  );
}

export default NavBar;
