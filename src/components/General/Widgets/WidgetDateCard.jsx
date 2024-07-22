import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/joy";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import EventBusyRounded from "@mui/icons-material/EventBusyRounded";

export function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const optionsDate = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

  return {
    formattedDate,
    formattedTime,
  };
}

function WidgetDateCard({ title, icon, dateTime }) {
  const { formattedDate, formattedTime } = formatDateTime(dateTime);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: "320px",
        minWidth: "200px",
        width: "95%",
      }}
    >
      <Box sx={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}>
        {icon}
      </Box>
      <CardContent
        sx={{
          minHeight: "max-content",
          minWidth: "max-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          level="title-lg"
          mb={0.5}
          sx={{ maxWidth: "70%", textAlign: "center" }}
        >
          {title}
        </Typography>
        <Divider />
        <Typography level="title-md" color="cyan">
          <Typography level="title-md" color="primary">
            {formattedDate}
          </Typography>
          {` ${formattedTime}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WidgetDateCard;
