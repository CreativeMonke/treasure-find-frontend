import React from "react";
import { Box, Typography } from "@mui/joy";

function Header() {
  const logoPath = process.env.PUBLIC_URL + "/icons/logo/logo.png"; // Construct the path to the logo image

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "var(--Header-height, 60px)", // Default height or use CSS variable
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <img
          src={logoPath}
          alt="Logo"
          style={{ maxHeight: "100%", maxWidth: "50px" }}
        />{" "}
        {/* Adjust logo size as needed */}
      </Box>
      <Typography level="title-sm" sx={{}}>
        CNER DEV
      </Typography>
    </Box>
  );
}

export default Header;
