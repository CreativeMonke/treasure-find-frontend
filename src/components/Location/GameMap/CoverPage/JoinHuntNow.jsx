import React from "react";
import { Box, Typography, Link, Stack, Button } from "@mui/joy";
import { OpenInNewRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function JoinHuntNow() {
    const navigate = useNavigate();
    const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
     <Stack spacing={2}>
      <Typography level="h2" color="warning" sx = {{
        textAlign: "center",

      }}>
        {t("joinHuntNowMessage")}
      </Typography>
      <Button variant="outlined" onClick={() => 
        navigate("/hunts")
      }>
        {t("redirectText")}
      </Button>
    </Stack>
    </Box>
  );
}

export default JoinHuntNow;
