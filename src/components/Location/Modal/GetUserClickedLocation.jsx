import { useMap } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function GetUserClickedLocation({setClickedLocation}) {
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
          setClickedLocation(evt.latlng);
        }
      );
    }

    map.on("click", OnMapClick);
    return () => {
      map.off("click", OnMapClick);
    };
  }, [map, marker, setClickedLocation]);
  return null;
}
export default GetUserClickedLocation;
