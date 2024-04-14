import React from "react";
import { Card, CardContent, Typography, Box, CircularProgress, chipClasses } from "@mui/joy";
import { useTranslation } from "react-i18next";

function WidgetCard({
  title,
  status,
  value,
  howMany,
  ofWhat,
  icon,
  isPercent,
  children,
}) {
  const userValue = howMany > 0 ? (value / howMany) * 100 : 0;
  const {t} = useTranslation()
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
      }}
    >
      <CardContent sx = {{
        minHeight: "6rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Typography level="title-lg" fontSize="md" mb={1}>
          {title}
        </Typography>
        {status && (
          <Typography level="body-md" mb={2} color="warning">
            {status}
          </Typography>
        )}
        {value != null && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isPercent ? (
              <>
                <CircularProgress determinate value={userValue} size="lg">
                  {icon}
                </CircularProgress>
                <Box sx={{ ml: 2 }}>
                <Typography level="body-md" color="neutral">
                  <Typography color="primary" level="title-lg">
                    {value}
                  </Typography>
                  {` % ${t("outOf")} ${ofWhat}`}
                </Typography>
                </Box>
              </>
            ) : (
              <Box>
                <Typography level="body-md" color="neutral">
                  <Typography color="primary" level="title-lg">
                    {value}
                  </Typography>
                  {` ${ofWhat}`}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export default WidgetCard;
