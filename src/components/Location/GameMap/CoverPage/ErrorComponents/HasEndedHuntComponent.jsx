import React from "react";
import { Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import NrOfCorrectAnswers from "./CorrectAnswers/NrOfCorrectAnswers";
function HasEndedHuntComponent() {
  const { t } = useTranslation();

  
  return (
    <Stack spacing={2}>
      <Typography level="h2" color="warning">
        {t("hasEndedHuntMessage")}
      </Typography>
      <NrOfCorrectAnswers />
    </Stack>
  );
}

export default HasEndedHuntComponent;
