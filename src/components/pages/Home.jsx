import React ,{ useState} from "react";
import Box from "@mui/joy/Box";
import "./Css/Home.css";
import Map from "../Location/Map"
import { Button } from "@mui/joy";
function Home() {

  var [liveLocation,setLiveLocation] = useState(1);
  function toggleLiveLocation()
  {
    setLiveLocation(!liveLocation);
  }
  return (
    <Box className="page-root" backgroundColor="background.body">
      <Box
        className="firstSection roundCorners"
      >
          <Map liveFocus = {liveLocation}/>
      </Box>
      <Button onClick={toggleLiveLocation}>Live location focus<br/>{liveLocation?"On":"Off"}</Button>

    </Box>
  );
}

export default Home;
