import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/joy";
import { useDispatch } from "react-redux";
import { startHunt } from "../../../../../features/auth/authSlice";
function NotStartedHuntComponent() {
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
        You didn't start the hunt yet
      </Typography>
      <Button
        size="md"
        variant="outlined"
        loading={loading}
        onClick={handleStartHunt}
      >
        Start Hunt
      </Button>
    </Stack>
  );
}

export default NotStartedHuntComponent;
