import { OpenInNewRounded, WarningAmberRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";

function WarningWithRedirect({ message = "", redirectLink = "/" }) {
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
        }}
      >
        <WarningAmberRounded sx={{ fontSize: 50 }} />
        <Button
          variant="outlined"
          size="sm"
          endDecorator={<OpenInNewRounded />}
          onClick={() => navigate(redirectLink)}
        >
          {message}
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default WarningWithRedirect;
