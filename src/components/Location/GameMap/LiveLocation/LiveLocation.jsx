import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { IconButton } from "@mui/joy";
import { ExploreRounded, ExploreOffRounded, Navigation, MyLocation } from "@mui/icons-material";
import { renderToString } from 'react-dom/server';
import "./LiveLocation.css"
const liveLocationIcon = new L.icon({
  iconUrl: "/icons/LiveLocation/my-location.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [1, -34],
});

const muiIcon = new L.divIcon({
  html: renderToString(<MyLocation style={{ fill: 'var(--joy-palette-primary-700, #0B6BCB)' }} />),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  className: 'custom-mui-icon'
});
function LiveLocationTracker({ setUserLocation }) {
  const map = useMap();
  const [userLocation, setUserLocationInternal] = useState(null);
  const [autoCenter, setAutoCenter] = useState(true); // New state to manage auto-centering

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocationInternal(newLocation);
        setUserLocation(newLocation);
        if (autoCenter) {
          map.flyTo(newLocation, map.getZoom()); // Only auto-center if enabled
        }
      },
      (error) => {
        setUserLocation(null);

        console.error("Error obtaining location", error);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, setUserLocation, autoCenter]); // Include autoCenter in the dependency array

  // Toggle function for the map centering feature
  const toggleAutoCenter = () => {
    setAutoCenter(!autoCenter);
    if (!autoCenter) {
      // If toggling to auto-center, move to the current location
      userLocation && map.flyTo(userLocation, map.getZoom());
    }
  };

  return (
    <>
      {userLocation && (
        <Marker position={userLocation} icon={muiIcon} />
      )}
      <IconButton
        variant="soft"
        color="neutral"
        size="lg"
        sx={{
          position: "absolute",
          left: 16,
          bottom: 16,
          zIndex: 1000, // Ensure the button is above map layers
        }}
        onClick={toggleAutoCenter}
      >
        {autoCenter ? (
          <ExploreRounded color="primary" />
        ) : (
          <ExploreOffRounded color="primary" />
        )}
      </IconButton>
    </>
  );
}

export default LiveLocationTracker;
