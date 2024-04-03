import React, { useState } from "react";
import MapModal from "../../../../Location/Modal/MapModal";
import { Button, Grid } from "@mui/joy";
import InputField from "../components/InputField";
function SelectLocationSection() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [open, setIsOpen] = useState(false);
  function handleChange(evt) {
    console.log(evt.target);
  }

  function handleClick(evt) {
    setIsOpen(!open);
  }
  return (
    <React.Fragment>
        {/*<MapModal open={open} />*/}
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <InputField label="Lat" setValue={setLat} />
        </Grid>
        <Grid item xs={5}>
          <InputField label="Lng" setValue={setLng} />
        </Grid>
        <Grid item xs={2} sx={{}}>
          <Button
            size="lg"
            sx={{
              width: "100%",
              height: "100%",
              mt: 2,
            }}
            onClick={handleClick}
          >
            Set on map
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SelectLocationSection;
