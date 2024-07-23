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
  return (
    <InnerPageSheet>
      <Grid
        container
        spacing={5}
        sx={{ overflow: "auto", justifyContent: "center" }}
      >
        {locations.map((location, index) => (
          <Grid item key={location._id} xs={12} md={6} lg={4} xl={3}>
            <PoiCard
              key={index}
              pic={location.imgSrc}
              name={location.name}
              desc={location.desc}
            />
          </Grid>
        ))}
      </Grid>
    </InnerPageSheet>
  );
}

export default PoiSection;
