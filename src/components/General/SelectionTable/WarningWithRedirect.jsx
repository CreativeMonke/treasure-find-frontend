import { OpenInNewRounded, WarningAmberRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";

function WarningWithRedirect({
  message = "",
  redirectLink = "",
  iconColor = "warning",
  messageColor = "warning",
}) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <WarningAmberRounded sx={{ fontSize: 70 }} color={iconColor} />
        {redirectLink ? (
          <Button
            variant="outlined"
            size="sm"
            endDecorator={<OpenInNewRounded />}
            onClick={() => navigate(redirectLink)}
          >
            {message}
          </Button>
        ) : (
          <Typography color={messageColor} level="title-sm">
            {message}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
}

export default WarningWithRedirect;
