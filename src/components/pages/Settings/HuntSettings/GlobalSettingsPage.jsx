import { Sheet, Typography, Grid } from "@mui/joy";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function GlobalSettingsPage() {
  const { startTime, endTime } = useSelector((state) => state.hunt);

  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "10px",
      }}
    >
      <Typography level="h1">Global settings</Typography>
      <Grid container>
        <Grid item xs={6} lg={3}>
        </Grid>
      </Grid>
    </Sheet>
  );
}
