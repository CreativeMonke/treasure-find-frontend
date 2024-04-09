import {  useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { IconButton } from "@mui/joy";
import { MyLocationRounded } from "@mui/icons-material";

const liveLocationIcon = new L.icon({
  iconUrl: "/icons/LiveLocation/my-location.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [1, -34],
});

function LiveLocationTracker({ setUserLocation }) {
  const map = useMap();
  const [userLocation, setUserLocationInternal] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setUserLocationInternal(newLocation);
        setUserLocation(newLocation);
        map.flyTo(newLocation, map.getZoom()); // Continually focus on the new user location
      },
      (error) => console.error('Error obtaining location', error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, setUserLocation]);

  // Adding the focus button directly in the component as a floating action button
  return (
    <>
      {userLocation && <Marker position={userLocation} icon={liveLocationIcon} />}
      <IconButton
        variant="soft"
        color="neutral"
        size = "lg"
        sx={{
          position: 'absolute',
          left: 16,
          bottom: 16,
          zIndex: 1000, // Ensure the button is above map layers
        }}
        onClick={() => userLocation && map.flyTo(userLocation, map.getZoom())}
      >
        <MyLocationRounded color="primary"/>
      </IconButton>
    </>
  );
}

export default LiveLocationTracker;
