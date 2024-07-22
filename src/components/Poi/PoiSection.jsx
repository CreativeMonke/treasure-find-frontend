import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import PoiCard from "./PoiCard";
import { useMediaQuery } from "usehooks-ts";
import TimelineCard from "./TimelineCard";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, Grid, Typography } from "@mui/joy";
import { getAllLocationsByUserHuntId } from "../../features/locations/locationSlice";
import InnerPageSheet from "../pages/PageStructure/InnerPageSheet";
function PoiSection(props) {
  ///Add loading
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLocationsByUserHuntId(props.huntId));
  }, []);
  const locations = useSelector((state) => state.locations.huntLocations);
  const desktop = useMediaQuery("(min-width: 900px)");
  return (
    <InnerPageSheet>
      <Grid
        container
        spacing={5}
        sx={{ overflow: "auto", justifyContent: "center" }}
      >
        {desktop
          ? locations.map((location, index) => (
              <Grid item key={location._id} xs={6} md={4} xl={3}>
                <PoiCard
                  key={index}
                  pic={location.imgSrc}
                  name={location.name}
                  desc={location.desc}
                />
              </Grid>
            ))
          : locations.map((location, index) => (
              <Grid item key={location._id} xs={12} md={10} xl={3}>
                <TimelineCard
                  key={index}
                  name={location.name}
                  pic={location.imgSrc}
                  desc={location.desc}
                />
              </Grid>
            ))}
      </Grid>
    </InnerPageSheet>
  );
}

export default PoiSection;
