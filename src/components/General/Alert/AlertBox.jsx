import React, { useEffect, useState } from "react";
import { Alert, Box, Grid, Snackbar, Typography } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../../../features/alert/alertSlice.js";
import {
  CheckCircleOutline,
  CheckCircleOutlineRounded,
  CheckCircleRounded,
  ErrorOutline,
  ErrorOutlineRounded,
  ErrorRounded,
  InfoOutlined,
  WarningAmberRounded,
  WarningRounded,
} from "@mui/icons-material";

const colorCodes = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "neutral",
  default: "neutral",
};
const iconTypes = {
  success: <CheckCircleOutlineRounded />,
  error: <ErrorOutlineRounded />,
  warning: <WarningAmberRounded />,
  info: <InfoOutlined />,
  default: <InfoOutlined />,
};

function AlertBox({ alert }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      variant="outlined"
      key={alert.id}
      startDecorator={iconTypes[colorCodes[alert.severity]]}
      severity={alert.severity}
      color={colorCodes[alert.severity]}
      size="sm"
      onClose={() => {
        setOpen(false);
        setTimeout(() => dispatch(clearAlert(alert.id)), 260);
      }}
      sx={{ position: "relative", "--Snackbar-inset": "0px" }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography level="title-md">{alert.actionName}</Typography>
        <Typography level="body-md">{alert.message}</Typography>
      </Box>
    </Snackbar>
  );
}

export default AlertBox;
