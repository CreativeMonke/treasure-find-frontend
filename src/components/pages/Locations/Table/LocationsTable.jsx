import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import LocationRow from "./LocationRow";
import { useLocations } from "../Context/LocationContext";
import { Button, Divider, Typography } from "@mui/joy";
import CreateButton from "./Create/CreateButton";

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
        borderRadius: "10px",
      }}
    >
      <Typography level="h1" sx={{ mb: 4 }}>
        Locations admin view
      </Typography>
      <Divider sx={{ mb: 3 }} >All Locations</Divider>
      <Sheet variant="plain" sx={{ mb: 4 }}>
        <Table
          borderAxis="xBetween"
          size="md"
          stickyFooter={false}
          stickyHeader
        >
          <thead>
            <tr>
              <th width="10%">ID</th>
              <th>Name</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th width = "10%"></th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <LocationRow
                key={index}
                index={index}
                id={location.id}
                name={location.name}
                question={location.question}
                answer={location.answer}
              />
            ))}
          </tbody>
        </Table>
      </Sheet>

      <CreateButton />
    </Sheet>
  );
}

export default LocationsTable;
