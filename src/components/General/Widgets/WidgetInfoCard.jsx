import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from "@mui/joy";
import { useTranslation } from "react-i18next";

function WidgetInfoCard({
  title,
  status,
  value,
  icon,
  children,
  additionalText,
}) {
  const { t } = useTranslation();
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
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
          sx={{ maxWidth: "75%", textAlign: "center" }}
        >
          {title}
        </Typography>
        {status && (
          <Typography level="body-md" mb={1} color="warning">
            {status}
          </Typography>
        )}
        <Divider />
        {value != null && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-md" color="neutral">
              <Typography color="primary" level="title-lg">
                {value}
              </Typography>
              {additionalText && ` ${additionalText}`}
            </Typography>
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export default WidgetInfoCard;
