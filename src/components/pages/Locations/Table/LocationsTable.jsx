import React, { useState, useEffect, createContext } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import LocationRow from "./LocationRow";
import { useLocations } from "../Context/LocationContext";
import { Typography } from "@mui/joy";

function LocationsTable() {
  const { locations } = useLocations();
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius : "10px",
      }}
    >
      <Typography level="h1" sx={{ mb: 4 }}>
        Locations admin view
      </Typography>
      <Table
        borderAxis="bothBetween"
        size="sm"
        stickyFooter={false}
        stickyHeader
        variant="plain"
      >
        <thead>
          <tr>
            <th width="10%">ID</th>
            <th>Name</th>
            <th>Question</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <LocationRow
              key={index}
              id={index}
              name={location.name}
              question={location.question}
              answer={location.answer}
            />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default LocationsTable;
