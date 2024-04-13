import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Sheet, Box, Typography, Grid, Button, Switch } from "@mui/joy";
const TimePick = ({ onSave, start, end, setStart, setEnd }) => {
  // Handle Save button click
  const handleSave = () => {
    // Format dates to ISO string and include timezone information
    const startTime = moment(start).tz(moment.tz.guess()).format();
    const endTime = moment(end).tz(moment.tz.guess()).format();
    onSave({ startTime, endTime });
  };

  return (
    <Box
      sx={{
        gridGap: "10px",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "border.divider",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <Typography level="title-lg">Set Hunt Times</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx = {{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap : 3
        }}>
          <Typography level="body-md">Start Time:</Typography>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Grid>
        <Grid item xs={12} md={6} sx = {{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap : 3
        }}>
          <Typography level="body-md">End Time:</Typography>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSave} fullWidth sx={{ bottom: 1 }}>
          Save Changes
        </Button>
      </Grid>
    </Box>
  );
};

export default TimePick;
