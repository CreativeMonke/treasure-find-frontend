import { MapContainer, TileLayer } from "react-leaflet";
import { React } from "react";
import GetUserClickedLocation from "./GetUserClickedLocation";
import { Modal, ModalDialog, Sheet } from "@mui/joy";
function Map(props) {
  return (
    <Sheet sx = {{
      height: "100%",
      width: "100%",
      maxWidth: "1500px",
      maxHeight: "1000px",
    }}>
      <MapContainer id="map" center={[47.1564288, 27.5841024]} zoom={16}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GetUserClickedLocation radius={props.radius} setClickedLocation = {props.setClickedLocation}/>
      </MapContainer>
    </Sheet>
  );
}
export default Map;
