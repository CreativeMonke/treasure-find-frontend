import React from "react";
import Box from "@mui/joy/Box";
import PoiCard from "./PoiCard";
import { useMediaQuery } from "usehooks-ts";
import TimelineCard from "./TimelineCard";
import { useSelector } from "react-redux";
import { Sheet, Grid , Typography} from "@mui/joy";
function PoiSection(props) {
  const locations = useSelector((state) => state.locations.locations);
  console.log(locations);
  const desktop = useMediaQuery("(min-width: 900px)");
  return (
    <Sheet
      className="poiList"
      variant="outlined"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        height: "100%",
        overflow:"hidden",
      }}
    >
      <Typography></Typography>
      <Grid container spacing={5} sx={{ overflow: "auto", justifyContent:"center"}}>
        {desktop
          ? locations.map((location, index) => (
              <Grid item key={location._id} xs={6} md = {4} xl = {3}>
                <PoiCard
                  key={index}
                  pic={location.imgSrc}
                  name={location.name}
                  desc={location.desc}
                />
              </Grid>
            ))
          : locations.map((location, index) => (
              <Grid item key={location._id} xs={12} md = {10} xl = {3}>
                <TimelineCard
                  key={index}
                  name={location.name}
                  pic={location.imgSrc}
                  desc={location.desc}
                />
              </Grid>
            ))}
      </Grid>
    </Sheet>
  );
}

export default PoiSection;
