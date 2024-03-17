import { Button } from "@mui/joy";
import React from "react";
import Box from "@mui/joy/Box";
import PoiSection from "../Poi/PoiSection";
import "./Css/Poi.css"
/// -> Get Section (to mongodb)
/// -> Create a new section
function handleClick(event) {
    console.log(event.child);
}
function POI() {
  return (
    <Box className = "poiPage" backgroundColor="background.body">
      <PoiSection/>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button onClick={handleClick}>Add New</Button>
      </Box>
    </Box>
  );
}

export default POI;
