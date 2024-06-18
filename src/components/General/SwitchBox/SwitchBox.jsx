import React, { useState } from "react";

import {
  Sheet,
  Box,
  Typography,
  Grid,
  Button,
  Switch,
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";
function SwitchBox({
  setChecked,
  checked,
  label,
  text,
  helperText,
  checkedText = "Yes",
  uncheckedText = "No",
}) {
  return (
    <React.Fragment>
      <Stack>
        <Typography level="h4" htmlFor={label.toLowerCase()}>
          {label}
        </Typography>
        <Divider>
          <MoreHorizRounded />
        </Divider>
        <FormControl
          orientation="horizontal"
          sx={{justifyContent: "space-between" }}
        >
          <div>
            <FormLabel>{text}</FormLabel>
            <FormHelperText>{helperText}</FormHelperText>
          </div>
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            color={checked ? "success" : "neutral"}
            variant={checked ? "solid" : "outlined"}
            endDecorator={checked ? checkedText : uncheckedText}
          />
        </FormControl>
      </Stack>
    </React.Fragment>
  );
}

export default SwitchBox;
