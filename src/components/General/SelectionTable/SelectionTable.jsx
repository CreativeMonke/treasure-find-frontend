import React, { useState, useEffect } from "react";
import { Typography, Stack, Divider, Grid, Input } from "@mui/joy";
import { MoreHorizRounded } from "@mui/icons-material";
import GenericTable from "../GenericTable/GenericTable";

export default function SelectionTable({
  huntTown,
  label,
  onChange,
  locations = [],
  selectedLocations = [],
}) {
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "question", headerName: "Question" },
    { field: "answer", headerName: "Correct Answer" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocationIds, setSelectedLocationIds] = useState();

  useEffect(() => {
    setSelectedLocationIds(selectedLocations.map((location) => location._id));
  }, [selectedLocations]);

  const availableLocations = locations.filter(
    (location) =>
      !selectedLocationIds.includes(location._id)
  );

  const locationsInHunt = locations.filter((location) =>
    selectedLocationIds.includes(location._id)
  );

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSelect(locationId) {
    const newSelectedLocationIds = selectedLocationIds.includes(locationId)
      ? selectedLocationIds.filter((id) => id !== locationId)
      : [...selectedLocationIds, locationId];

    setSelectedLocationIds(newSelectedLocationIds);
    onChange(newSelectedLocationIds);
  }

  return (
    <React.Fragment>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Typography level="h4">{label}</Typography>
        <Divider>
          <MoreHorizRounded />
        </Divider>
        <Input
              placeholder="Search locations"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              sx = {{
                mb : 2
              }}
            />
        <Grid container spacing={2} rowSpacing={8}>
          <Grid item xs={12} md={6}>
            <GenericTable
              title="Available Locations"
              columns={columns}
              rows={availableLocations.filter((location) =>
                location.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              onSelect={handleSelect}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <GenericTable
              title="Locations in the Hunt"
              columns={columns}
              rows={locationsInHunt}
              onSelect={handleSelect}
            />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
}
