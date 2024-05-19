import React, { useEffect, useState } from "react";
import MapModal from "../../../../Location/Modal/MapModal";
import { Button, Grid } from "@mui/joy";
import InputField from "../../../components/InputField";
import { useTranslation } from "react-i18next";
function SelectLocationSection(props) {
  const {t} = useTranslation();
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);
  ///On latlng update, uptade lat and lng values also
  useEffect(() => {
    if(props.value){
      setLat(props.value.lat);
      setLng(props.value.lng);
    }
  },[props.value])
  useEffect (() => {
    if(lat && lng){
      props.setValue({lat:lat,lng:lng});
    }
  },[lat,lng])
  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={6} xl = {3}>
          <InputField label="Lat" placeholder = {t("noValue")} setValue={setLat} value = {lat}/>
        </Grid>
        <Grid item xs={6} xl = {3}>
          <InputField label="Lng" placeholder = {t("noValue")} setValue={setLng} value = {lng}/>
        </Grid>
        <Grid
          item
          xs={12}
          xl={6}
          sx={{
            display: 'flex',
            width: "100%",
            height: "50dvh",
            maxHeight: "1000px",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <MapModal setClickedLocation = {props.setValue}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SelectLocationSection;
