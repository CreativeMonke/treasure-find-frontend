import { Divider, Option, Select, Stack, Typography } from "@mui/joy";
import React from "react";
import cities from "../../data/romanianCities.json";
import { MoreHorizRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function CityPicker({
  onChange,
  label = "",
  value,
  required = 0,
}) {
  const { t } = useTranslation();
  function handleChange(e, newValue) {
    onChange(newValue);
  }
  return (
    <React.Fragment>
      <Stack>
        <Typography level="h4" htmlFor={label.toLowerCase()}>
          {label}
        </Typography>
        <Divider>
          <MoreHorizRounded />
        </Divider>
        <Select
          required={required}
          name="town"
          placeholder={value}
          onChange={handleChange}
          size="md"
        >
          {cities.map((city) => (
            <Option key={city.abr} value={city.nume}>
              {city.nume}
            </Option>
          ))}
        </Select>
      </Stack>
    </React.Fragment>
  );
}
