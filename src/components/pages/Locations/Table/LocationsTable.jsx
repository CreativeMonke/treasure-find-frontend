import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import LocationRow from "./LocationRow";
import { useSelector } from "react-redux";
import { Divider, Grid, Typography } from "@mui/joy";
import CreateButton from "./Create/CreateButton";

function LocationsTable() {
  const locations = useSelector((state) => state.locations.locations);

  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography level="h1">Locations admin view</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>All Locations</Divider>
        </Grid>
        <Grid item xs={12}>
          <Sheet
            variant="plain"
          >
            <Table
              borderAxis="xBetween"
              size="md"
              noWrap
              stickyFooter={false}
              stickyHeader
            >
              <thead>
                <tr>
                  <th width="10%">#</th>
                  <th>Name</th>
                  <th>Question</th>
                  <th>Correct Answer</th>
                  <th width="80px"></th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <LocationRow
                    key={index + location._id}
                    index={index}
                    id={location._id}
                    name={location.name}
                    question={location.question}
                    answer={location.answer}
                  />
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
        <Grid item xs={8} xl={10} />
        <Grid item xs={4} xl={2}>
          <CreateButton />
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default LocationsTable;
