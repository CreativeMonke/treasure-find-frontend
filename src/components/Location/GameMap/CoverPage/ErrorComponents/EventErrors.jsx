import React, { Fragment } from "react";
import { Divider, Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import NrOfCorrectAnswers from "./CorrectAnswers/NrOfCorrectAnswers";
import { ArrowDropDown } from "@mui/icons-material";

function EventErrors({ hasStarted, hasEnded }) {
  const { t } = useTranslation();

  let errorMsg = "";
  if (hasEnded && hasStarted) {
    errorMsg = t("eventEnded");
  } else if (!hasStarted) {
    errorMsg = t("eventHasNotStarted");
  }

  return (
    <Stack spacing={2}>
      <Typography level="h2" color="primary" sx = {{
        textAlign: "center"
      }}>
        {errorMsg}
      </Typography>

      {hasEnded && hasStarted && <Fragment >
        <Divider><ArrowDropDown /></Divider>
        <NrOfCorrectAnswers />
        </Fragment> }
    </Stack>
  );
}

export default EventErrors;
