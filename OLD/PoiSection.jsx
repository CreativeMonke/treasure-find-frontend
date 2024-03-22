import React, { useState } from "react";
import Box from "@mui/joy/Box";
import locations from "../locationsExamples";
import PoiCard from "./PoiCard";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@mui/joy";
import PoiCardMob from "./PoiCardMobile";
function PoiSection(props) {
  const desktop = useMediaQuery("(min-width: 760px)");
  const [cardData, updateCardData] = useState(locations[0]);
  function handleButtonPressR(props) {
    const index = locations.findIndex(
      (location) => location.name == cardData.name
    );

    if (locations[index + 1] != undefined) updateCardData(locations[index + 1]);
    else updateCardData(locations[0]);
  }

  function handleButtonPressL(props) {
    const index = locations.findIndex(
      (location) => location.name == cardData.name
    );
    if (locations[index - 1] != undefined) updateCardData(locations[index - 1]);
    else updateCardData(locations[Object.keys(locations).length - 1]);
  }
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
            <Button className="sideButton" onClick={handleButtonPressL}>
              Left
            </Button>
          </Box>
          <PoiCardMob
            key={cardData.index}
            name={cardData.name}
            pic={cardData.pic}
            desc={cardData.desc}
          />
          <Box className="sideSection sideRight">
            <Button className="sideButton" onClick={handleButtonPressR}>
              Right
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PoiSection;
