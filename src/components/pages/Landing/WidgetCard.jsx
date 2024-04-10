import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/joy";

function WidgetCard({ title, status, value }) {
  const userValue = value ? (value / 100) * 100 : 0;

  return (
    <Card variant="outlined" sx = {{
      display:"flex"
    }}>
      <CardContent>
        <Typography level="title-lg" fontSize="md" mb={1}>
          {title}
        </Typography>
        {status && (
          <Typography level="body2" mb={2} color="text.secondary">
            {status}
          </Typography>
        )}
        {value != null && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress determinate value={userValue} size="lg" > 

            </CircularProgress>
            <Box sx={{ ml: 2 }}>
              <Typography level="body3" color="text.primary">
                {`${value}% Users`}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default WidgetCard;
