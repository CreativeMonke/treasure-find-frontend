import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Sheet,
  Grid,
  Typography,
  Button,
} from "@mui/joy";
import { useSelector } from "react-redux";
import TimelineCard from "../../../Poi/TimelineCard";
import WidgetCard from "../../Landing/WidgetCard";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMapOverview from "./MapOverview/LocationMapOverview";

function HuntDetailsPage({
  huntName,
  townName,
  startTime,
  endTime,
  numberOfLocations,
  numberOfUsers,
  duration,
  locations = [],
  loading,
}) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography level="h2">{huntName} - details</Typography>
      <Grid container spacing={3} sx={{ mt: 2, height: "100%" }}>
        <Grid item xs={12} md={8}>
          <LocationMapOverview locations={locations} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Typography level="body-lg">Start / End Time</Typography>
            <Typography level="body-md">
              {startTime} - {endTime}
            </Typography>
          </Box>
          <WidgetCard
            title="Number of Locations"
            value={numberOfLocations}
            isPercent={false}
            ofWhat="locations"
          />
          <WidgetCard
            title="Number of Users"
            value={numberOfUsers}
            isPercent={false}
            ofWhat="users"
          />
          <Box>
            <Typography level="body1">Town & Duration</Typography>
            <Typography level="body2">
              {townName} - {duration}
            </Typography>
          </Box>
          <Box>
            <Typography level="body1">Actions</Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>
              Exit Hunt
            </Button>
            <Button variant="outlined" sx={{ mt: 1 }}>
              Edit Hunt
            </Button>
            <Button variant="outlined" sx={{ mt: 1 }}>
              Go to Hunts Page
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default HuntDetailsPage;
