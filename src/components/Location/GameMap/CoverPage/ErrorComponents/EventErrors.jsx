import React from "react";
import { Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import NrOfCorrectAnswers from "./CorrectAnswers/NrOfCorrectAnswers";

function EventErrors({ hasStarted, hasEnded }) {
  const { t } = useTranslation();

  let errorMsg = "";
  if (hasEnded && hasStarted) {
    errorMsg = t("eventEnded");
  } else if (!hasStarted) {
    errorMsg = t("eventHasNotStarted");
  }

  return (
    <Stack>
      <Typography level="h2" color="primary">
        {errorMsg}
      </Typography>
      {hasEnded && hasStarted && <NrOfCorrectAnswers />}
    </Stack>
  );
}

export default EventErrors;
