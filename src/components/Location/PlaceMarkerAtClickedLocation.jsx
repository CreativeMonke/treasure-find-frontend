import { useMap, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { React, useState, useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function PlaceMarkerAtClickedLocation(props) {
  const [marker, setMarker] = useState(null);

  const map = useMap();

  useEffect(() => {
    const geocoder = new L.Control.Geocoder.Nominatim();

    function OnMapClick(evt) {
      geocoder.reverse(
        evt.latlng,
        map.options.crs.scale(map.getZoom()),
        (results) => {
          const r = results[0];
          if (r) {
            if (marker) {
              marker.remove();
            }
          }
          const newMarker = L.marker(evt.latlng)
            .addTo(map)
            .bindPopup(`${r.name}`)
            .openPopup();

          setMarker(newMarker);

          console.log(`Clicked location: ${evt.latlng}`);
        
        }
      );
    }

    map.on("click", OnMapClick);
    return () => {
      map.off("click", OnMapClick);
    };
  }, [map, marker]);
  return null;
}
export default PlaceMarkerAtClickedLocation;
