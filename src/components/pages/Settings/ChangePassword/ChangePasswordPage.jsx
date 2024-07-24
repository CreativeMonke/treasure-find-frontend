import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import { Box, Divider, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InnerStackSection from "./InnerStackSection";
import { EmailRounded, LockResetRounded } from "@mui/icons-material";

function ChangePasswordPage() {
  const { t } = useTranslation();


  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography
          level="h1"
          sx={{
            mb: 2,
          }}
        >
          {t("changePassword")}
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
      </InnerPageSheet>
    </React.Fragment>
  );
}

export default ChangePasswordPage;
