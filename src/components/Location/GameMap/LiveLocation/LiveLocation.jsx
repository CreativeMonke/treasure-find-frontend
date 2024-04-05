import { useCallback, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Button } from "@mui/joy";

const liveLocationIcon = new L.icon({
  iconUrl: "/icons/GpsArrow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LiveLocationTracker({userLocation, setUserLocation}) {
  const map = useMap();
  const [centerMapOnUser, setCenterMapOnUser] = useState(true);
  const disableCentering = useCallback(() => {
    setCenterMapOnUser(false);
  }, []);

  useEffect(() => {

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newLocation);
        if (centerMapOnUser) {
          map.flyTo(newLocation, map.getZoom());
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
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, centerMapOnUser,disableCentering]);

  return userLocation ? (
    <>
      <Marker position={userLocation} icon={liveLocationIcon} />
      <Button
        color={centerMapOnUser ? "primary" : "neutral"}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 1000,
        }}
        onClick={() => setCenterMapOnUser(!centerMapOnUser)}
      >
        {!centerMapOnUser ? "Focus Off" : "Focus On"}
      </Button>
    </>
  ) : null;
}
export default LiveLocationTracker;
