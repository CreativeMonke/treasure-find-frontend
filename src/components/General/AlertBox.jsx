import React, { useEffect } from "react";
import { Alert, Box, Grid, Typography } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../../features/alert/alertSlice.js";

const colorCodes = {
  "success": "success",
  "error": "danger",
  "warning": "warning",
  "info": "neutral",
  "default": "neutral"
};

const AlertBox = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert.alerts) || [];

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(clearAlert(alerts[0].id));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 10000,
        maxHeight: '50vh',
        minHeight: 'max-content',
        minWidth: 'max-content',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'var(--joy-palette-background-backdrop)',
        borderRadius: 4,
        padding: 1
      }}
    >
      <Grid container spacing={2} direction="column">
        {alerts.map((alert) => (
          <Grid item key={alert.id}>
            <Alert
              invertedColors
              severity={alert.severity}
              color={colorCodes[alert.severity]}
              size="md"
              onClose={() => dispatch(clearAlert(alert.id))}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
              }}
            >
              <Typography level="title-md">{alert.actionName}</Typography>
              <Typography level="body-md">{alert.message}</Typography>
            </Alert>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlertBox;
