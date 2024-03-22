import React from "react";
import Box from "@mui/joy/Box";
import PoiSection from "../Poi/PoiSection";
import "./Css/Poi.css"
/// -> Get Section (to mongodb)
/// -> Create a new section

function POI() {
  return (
    <Box className = "poiPage" backgroundColor="background.body">
      <PoiSection />
    </Box>
  );
}

export default POI;
