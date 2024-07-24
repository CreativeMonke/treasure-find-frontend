import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import { Box, Divider, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InnerStackSection from "./InnerStackSection";
import { EmailRounded } from "@mui/icons-material";

function ChangeEmailPage() {
  const { t } = useTranslation();
  const currentEmail = useSelector((state) => state.auth.user.email);
  const [newEmail, setNewEmail] = useState(null);

  function handleEmailChange(value) {
    setNewEmail(value);
  }
  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography
          level="h1"
          sx={{
            mb: 2,
          }}
        >
          {t("changeEmail")}
        </Typography>
        <Divider>
          <EmailRounded />
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

export default ChangeEmailPage;
