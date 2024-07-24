import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import {
  Box,
  Button,
  Card,
  Divider,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InnerStackSection from "./InnerStackSection";
import { EmailRounded, LockResetRounded, OpenInNew } from "@mui/icons-material";

function ResetPasswordPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundImageUrl = isDarkMode
    ? "/icons/backgroundDark.jpg"
    : "/icons/backgroundLight.jpg";
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box
        className="authSection"
        sx={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Sheet
          variant="soft"
          sx={{
            p: 2,
            opacity: 0.95,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            height: "80%",
            minHeight: "560px",
            maxHeight: "650px",
            width: "90%",
            maxWidth: "600px",
            overflow: "auto",
          }}
        >
          <Typography
            level="h1"
            sx={{
              mb: 2,
            }}
          >
            {t("resetPassword")}
          </Typography>
          <Divider>
            <LockResetRounded />
          </Divider>
          <Box
            sx={{
              height: "100%",
              p: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InnerStackSection />
          </Box>
        </Sheet>
      </Box>
    </React.Fragment>
  );
}

export default ResetPasswordPage;
