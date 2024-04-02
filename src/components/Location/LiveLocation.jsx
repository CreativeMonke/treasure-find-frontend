import React, { useState, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";


const liveLocationIcon = new L.Icon({
  iconUrl: "./icons/GpsArrow.png", // URL to your custom icon image
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon to ensure it points to the exact location
  popupAnchor: [1, -34], // Position of the popup relative to the icon
  iconAngle: 0,
});

function LiveLocation(props) {
  const [liveMarker, setLiveMarker] = useState(null);
  const map = useMap();

  useEffect(() => {
    function updateLiveLocation() {
      navigator.geolocation.watchPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          const latlng = L.latLng(latitude, longitude);

          if (liveMarker) {
            liveMarker.setLatLng(latlng);
            if(props.liveFocus)
            map.flyTo(latlng, 16);

            liveMarker.setIcon(
              new L.Icon({
                iconUrl: "/icons/GpsArrow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            );
          } else {
            const newLiveMarker = L.marker(latlng, { icon: liveLocationIcon })
              .addTo(map)
              .bindPopup("You are here");

            setLiveMarker(newLiveMarker);
            if(props.liveFocus)
            map.flyTo(latlng, 16);
          }
        },
        (err) => {
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    }

    updateLiveLocation();

    return () => {
      if (liveMarker) liveMarker.remove();
    };
  }, [map, liveMarker]);
  return null;
}

export default LiveLocation;
