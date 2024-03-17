import React from "react";
import Box from "@mui/joy/Box";
import "./Css/Home.css";
import Map from "../Location/Map"
function Home() {
  return (
    <Box className="page-root" backgroundColor="background.body">
      <Box
        className="firstSection roundCorners"
      >
          <Map />
      </Box>
    </Box>
  );
}

export default Home;
