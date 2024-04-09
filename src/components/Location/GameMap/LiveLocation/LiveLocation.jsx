import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { IconButton } from "@mui/joy";
import { MyLocationRounded, MyLocationOff, MyLocationSharp, ExploreRounded, ExploreOffRounded } from "@mui/icons-material";

const liveLocationIcon = new L.icon({
  iconUrl: "/icons/LiveLocation/my-location.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [1, -34],
});

function LiveLocationTracker({ setUserLocation }) {
  const map = useMap();
  const [userLocation, setUserLocationInternal] = useState(null);
  const [autoCenter, setAutoCenter] = useState(true); // New state to manage auto-centering

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setUserLocationInternal(newLocation);
        setUserLocation(newLocation);
        if (autoCenter) {
          map.flyTo(newLocation, map.getZoom()); // Only auto-center if enabled
        }
      },
      (error) => console.error('Error obtaining location', error),
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
      {userLocation && <Marker position={userLocation} icon={liveLocationIcon} />}
      <IconButton
        variant="soft"
        color="neutral"
        size="lg"
        sx={{
          position: 'absolute',
          left: 16,
          bottom: 16,
          zIndex: 1000, // Ensure the button is above map layers
        }}
        onClick={toggleAutoCenter}
      >
        {autoCenter ? <ExploreRounded color="primary"/> : <ExploreOffRounded color="primary"/>}
      </IconButton>
    </>
  );
}

export default LiveLocationTracker;
