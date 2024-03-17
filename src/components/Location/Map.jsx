import { MapContainer, TileLayer} from "react-leaflet";
import {React} from "react"
import PlaceMarker from "./PlaceMarker";
import LiveLocation from "./LiveLocation";
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
            <PlaceMarker radius = {100}/>
            <LiveLocation />
          </MapContainer>
    );
}
export default Map;