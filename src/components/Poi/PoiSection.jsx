import React from "react";
import Box from "@mui/joy/Box";
import locations from "../locationsExamples";
import PoiCard from "./PoiCard";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@mui/joy";
import PoiMobileMenu from "./PoiMobileMenu";
import PoiCardMob from "./PoiCardMobile";
function PoiSection(props) {
  const desktop = useMediaQuery("(min-width: 760px)");
  console.log(desktop);
  return (
    <Box className="poiList">
      {desktop ? (
        locations.map((location, index) => (
          <PoiCard
            key={index}
            pic={location.pic}
            name={location.name}
            desc={location.desc}
          />
        ))
      ) : (
        <Box className="mobileView">
          <Box className="sideSection sideLeft">
            <Button className="sideButton">Left</Button>
          </Box>
            <PoiCardMob />
          <Box className="sideSection sideRight">
            <Button className="sideButton">Right</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PoiSection;
