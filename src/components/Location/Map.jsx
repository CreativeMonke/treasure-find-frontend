import { MapContainer, TileLayer} from "react-leaflet";
import {React} from "react"
import LiveLocation from "./LiveLocation";
import PlaceMarkerAtClickedLocation from "./PlaceMarkerAtClickedLocation";
import PlaceMarkerAtLocations from "./PlaceMarkerAtPoi";
function Map(props)
{
    return(
        <MapContainer id="map"
          center={[47.1564288, 27.5841024]}
            zoom={16}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PlaceMarkerAtClickedLocation radius = {100}/>
            <LiveLocation liveFocus = {props.liveFocus}/>
          </MapContainer>
    );
}
export default Map;