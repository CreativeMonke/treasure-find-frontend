import { MapContainer, TileLayer , useMap, Popup , Marker } from "react-leaflet";
import L from "leaflet"
import {React , useState , useEffect} from "react"
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function PlaceMarker(props)
{
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        console.log(e);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = props.radius;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);


    return position === null ? null : (
        <Marker position={position}>
          <Popup>
            You are here. <br />
            Map bbox: <br />
            <b>Southwest lng</b>: {bbox[0]} <br />
            <b>Southwest lat</b>: {bbox[1]} <br />
            <b>Northeast lng</b>: {bbox[2]} <br />
            <b>Northeast lat</b>: {bbox[3]}
          </Popup>
        </Marker>
      );
    }
export default PlaceMarker;