import { MapContainer, TileLayer , useMap, Popup , Marker } from "react-leaflet";
import L from "leaflet"
import {React , useState , useEffect} from "react"
import PlaceMarker from "./PlaceMarker";
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
          </MapContainer>
    );
}
export default Map;