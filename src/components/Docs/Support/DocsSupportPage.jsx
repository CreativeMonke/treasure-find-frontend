import { Box, Breadcrumbs, Sheet, Stack, Typography } from "@mui/joy";
import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import SupportPage from "../../pages/Support/SupportPage";
import { useTranslation } from "react-i18next";
import { HelpCenterRounded, HomeRounded } from "@mui/icons-material";

function DocsSupportPage() {
  const { t } = useTranslation();
  return (
    <Sheet
      component="main"
      className="MainContent"
      boxSizing="border-box"
      maxHeight="100vh"
      sx={{
        backgroundColor: "background.body",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack>
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "background.paper",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography level="h1" sx={{ textAlign: "center" }}>
            {t("support")}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ alignSelf: "flex-start" }}>
            <RouterLink to="/landing">
              <Typography
                level="title-md"
                color="primary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <HomeRounded />
                {t("home")}
              </Typography>
            </RouterLink>
            <Typography
              level="title-md"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <HelpCenterRounded />
              {t("support")}
            </Typography>
          </Breadcrumbs>
        </Sheet>

        <SupportPage />
      </Stack>
    </Sheet>
  );
}

export default DocsSupportPage;
