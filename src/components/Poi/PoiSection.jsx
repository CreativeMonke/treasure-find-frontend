import React from "react";
import Box from "@mui/joy/Box";
import locations from "../locationsExamples";
import PoiCard from "./PoiCard";
import { useMediaQuery } from "usehooks-ts";
import PoiCardMob from "./PoiCardMobile";
function PoiSection(props) {
  const desktop = useMediaQuery("(min-width: 760px)");
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
        <Box className="mobileView" >
        {locations.map((location,index) => 
          <PoiCardMob
          key={index}
          question={location.question}
          name={location.name}
          pic={location.pic}
          desc={location.desc}
        />
        )}
        </Box>
      )}
    </Box>
  );
}

export default PoiSection;
