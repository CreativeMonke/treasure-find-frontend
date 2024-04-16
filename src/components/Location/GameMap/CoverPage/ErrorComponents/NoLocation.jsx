import React from "react";
import { Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

function NoLocationComponent() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography level="h2" color="danger" sx = {{
        textAlign: "center"
      }}>
        {t("locationPermissionRequired")}
      </Typography>
    </Stack>
  );
}

export default NoLocationComponent;
