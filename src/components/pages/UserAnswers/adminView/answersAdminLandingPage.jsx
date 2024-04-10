import React from "react";
import { Sheet, Typography, Box } from "@mui/joy";

function AdminAnswersLandingPage() {
  return (
    <Box sx = {{
        height: "100%",
        overflow: "auto",
    }}>
      <Sheet
        variant="outlined"
        sx={{
          overflow: "auto",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          borderRadius: "10px",
        }}
        >
        <Typography level="h1">Answers Overview</Typography>
      </Sheet>
    </Box>
  );
}
export default AdminAnswersLandingPage;
