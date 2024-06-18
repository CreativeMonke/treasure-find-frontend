import React from "react";
import {
  Typography,
  Stack,
  Divider,
  Chip,
  Box,
  Option,
  Select,
} from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";

export default function VerticalMultiSelect({
  label,
  onChange,
  values = [],
  defaultValues = [],
}) {
  return (
    <React.Fragment>
      <Stack sx = {{
        width: '100%',
      }}>
        <Typography level="h4" htmlFor={label.toLowerCase()}>
          {label}
        </Typography>
        <Divider>
          <MoreHorizRounded />
        </Divider>
        <Select
          multiple
          defaultValue={defaultValues}
          renderValue={(selected) => (
            
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
            >
            {console.log(selected)}
              {selected.map((selectedOption) => (
                <Chip key={selectedOption.id} variant="soft" color="primary">
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>
          )}
          slotProps={{
            listbox: {
              sx: {
                width: "100%",
              },
            },
          }}
        >
          {values.map((value) => (
            <Option value={value.name} key={value.id}>
              {value.name}
            </Option>
          ))}
        </Select>
      </Stack>
    </React.Fragment>
  );
}
