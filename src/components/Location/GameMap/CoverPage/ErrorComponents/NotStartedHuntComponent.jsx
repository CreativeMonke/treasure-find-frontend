import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/joy";
import { useDispatch } from "react-redux";
import { startHunt } from "../../../../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
function NotStartedHuntComponent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function handleStartHunt() {
    setLoading(true);
    const res = await dispatch(startHunt());
    setLoading(false);
  }
  return (
    <Stack spacing={4} sx={{}}>
      <Typography level="h2" color="primary">
        {t("notStartedHuntMessage")}
      </Typography>
      <Button
        size="md"
        variant="outlined"
        loading={loading}
        onClick={handleStartHunt}
      >
        {t("startHunt")}
      </Button>
    </Stack>
  );
}

export default NotStartedHuntComponent;
