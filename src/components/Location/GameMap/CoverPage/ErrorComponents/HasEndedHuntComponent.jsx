import React from "react";
import { Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

function NoLocationComponent() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography level="h2" color="danger">
        Your hunt has ended!
      </Typography>
    </Stack>
  );
}

export default NoLocationComponent;
