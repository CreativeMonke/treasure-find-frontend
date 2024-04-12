import React from "react";
import { Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

function HasEndedHuntComponent() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography level="h2" color = "warning">
        {t("hasEndedHuntMessage")}
      </Typography>
    </Stack>
  );
}

export default HasEndedHuntComponent;
