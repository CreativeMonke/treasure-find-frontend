import React from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import "./navbar.css";
function NavBar() {
  const location = useLocation();
  const isCurrent = (path) => location.pathname === path;
  
  return (
    <Box className = "navBar"
    boxShadow= "md"
    backgroundColor="background.body"
      sx={{
        "& .navButton": {
          margin: "1%",
          minWidth: "100px",
        },
      }}
    >
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
        to="/about-support"
        variant={isCurrent("/about-support") ? "solid" : "plain"}
      >
        About
      </Button>
    </Box>
  );
}

export default NavBar;
