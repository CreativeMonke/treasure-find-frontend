import { MapContainer, TileLayer } from "react-leaflet";
import { React } from "react";
import GetUserClickedLocation from "./GetUserClickedLocation";
import { Modal, ModalDialog } from "@mui/joy";
function Map(props) {
  return (
    <Modal open={props.open}>
      <ModalDialog layout="center">
        <MapContainer id="map" center={[47.1564288, 27.5841024]} zoom={16}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GetUserClickedLocation radius={100} />
        </MapContainer>
      </ModalDialog>
    </Modal>
  );
}
export default Map;
