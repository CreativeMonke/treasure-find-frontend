import React from "react";
import { Typography, Textarea, Button, Stack, Divider } from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";

const GridItem = ({ label, value, onChange, hasError }) => {
  function handleChange(evt)
  {
    onChange(evt.target.value);
  }
  return (
    <Stack>
      <Typography level="h4" htmlFor={label.toLowerCase()}>
        {label}
      </Typography>
      <Divider>
        <MoreHorizRounded />
      </Divider>
      <Textarea
        id={label.toLowerCase()}
        minRows={2}
        value={value}
        placeholder={
          hasError ? "Field cannot be empty!" : `Enter ${label.toLowerCase()}`
        }
        onChange={(evt) => handleChange(evt)}
        error={hasError}
        sx={{ width: "100%" }}
      />
    </Stack>
  );
};

export default GridItem;
