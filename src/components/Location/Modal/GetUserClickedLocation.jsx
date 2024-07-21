import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import MuiToSvgIcon from "../../General/MuiToSvgIcon";
import { AddLocationRounded } from "@mui/icons-material";

function GetUserClickedLocation({ setClickedLocation }) {
  const markerRef = useRef(null);
  const map = useMap();
  const icon = MuiToSvgIcon({
    name: AddLocationRounded,
    color: "var(--joy-palette-primary-200, #0B6BCB)",
  });
  useEffect(() => {
    function onMapClick(evt) {
      if (markerRef.current) {
        markerRef.current.remove();
      }

      const newMarker = L.marker(evt.latlng, { icon }).addTo(map);
      markerRef.current = newMarker;
      setClickedLocation(evt.latlng);
    }

    map.on("click", onMapClick);
    return () => {
      map.off("click", onMapClick);
    };
  }, [map, setClickedLocation]);

  return null;
}

export default GetUserClickedLocation;
