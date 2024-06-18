import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
//import "./DatePick.css"
import "react-datepicker/dist/react-datepicker.css";

import {
  Sheet,
  Box,
  Typography,
  Grid,
  Button,
  Switch,
  Stack,
  Divider,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import { MoreHorizRounded } from "@mui/icons-material";
function DatePick({ onChange, date, label }) {
  return (
    <React.Fragment>
      <Stack>
        <Typography level="h4" htmlFor={label.toLowerCase()}>
          {label}
        </Typography>
        <Divider>
          <MoreHorizRounded />
        </Divider>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <DatePicker
            selected={date}
            onChange={(date) => onChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Box>
      </Stack>
    </React.Fragment>
  );
}

export default DatePick;
