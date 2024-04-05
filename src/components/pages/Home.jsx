import React ,{ useState} from "react";
import Box from "@mui/joy/Box";
import "./Css/Home.css";
import MapWithLocations from "../Location/GameMap/MapWithLocation";
function Home() {

  return (
    <Box className="page-root" backgroundColor="background.body">
      <MapWithLocations />
    </Box>
  );
}

export default Home;
