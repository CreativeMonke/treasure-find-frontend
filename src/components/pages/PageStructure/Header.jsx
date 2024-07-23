import React from "react";
import { Box, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

function Header() {
  const logoPath = process.env.PUBLIC_URL + "/icons/logo/logo.png";
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          minWidth: "120px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src={logoPath}
          alt="Logo"
          style={{ maxHeight: "95%", maxWidth: "100px" }}
        />
      </Box>
      <Typography
        level="title-md"
        textAlign="right"
        sx={{
          right: 20,
          position: "relative",
          width: "30%",
          maxWidth: "120px",
        }}
      >
        {t("appName")}
      </Typography>
    </React.Fragment>
  );
}

export default Header;
