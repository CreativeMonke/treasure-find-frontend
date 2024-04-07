import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { React } from "react";
import GetUserClickedLocation from "./GetUserClickedLocation";
import { Modal, ModalDialog, Sheet } from "@mui/joy";

import L from "leaflet";
function MapModal(props) {
  console.log(props.selectedLocationCoords);
  const locationIcon = new L.Icon({
    iconUrl: "/icons/locationIcons/accountIcon.png",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
  return (
    <Sheet
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "1500px",
        maxHeight: "1000px",
      }}
    >
      <MapContainer id="map" center={props.centerOn?props.centerOn:[47.1564288, 27.5841024]} zoom={16}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {props.selectedLocationCoords && (
          <Marker
            position={[
              props.selectedLocationCoords.lat,
              props.selectedLocationCoords.lng,
            ]}
            icon={locationIcon}
          />
        )}
        <GetUserClickedLocation setClickedLocation={props.setClickedLocation} />
      </MapContainer>
    </Sheet>
  );
}
export default MapModal;
