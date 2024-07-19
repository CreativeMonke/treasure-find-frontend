import { Box, Grid } from "@mui/joy";
import { DateCalendar } from "@mui/x-date-pickers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "./AlertBox";

export default function AlertsGrid() {
  const alerts = useSelector((state) => state.alert.alerts) || [];

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 10000,
        maxHeight: "80vh",
        maxWidth: "50vh",
        height: "max-content",
        minHeight: "100px",
        minWidth: "max-content",
        overflowY: "hidden",
        overflowX: "hidden",
        borderRadius: 4,
      }}
    >
      {alerts.map((alert) => (
        <Grid item key={alert.id}>
          <AlertBox alert={alert} />
        </Grid>
      ))}
    </Grid>
  );
}
