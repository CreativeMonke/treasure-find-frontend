import React from "react";
import { Circle, useMap } from "react-leaflet";
import L from "leaflet";
const circleColors = {
  accesible: "var(--joy-palette-primary-500)",
  notAccesible: "var(--joy-palette-neutral-500)",
  answered: "var(--joy-palette-success-500)",
};

function RangeCircle({
  answered,
  userLocation,
  location,
  handleLocationSelect,
}) {
  const map = useMap();
  function checkUserProximity(location) {
    if (!userLocation) return false;
    const distance = L.GeometryUtil.distance(
      map,
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(location.lat, location.lng)
    );
    return distance <= location.radius;
  }
  const circleColor = answered
    ? circleColors.answered
    : checkUserProximity(location)
    ? circleColors.accesible
    : circleColors.notAccesible;
  return (
    <Circle
      key = {location.id}
      center={[location.lat, location.lng]}
      radius={130} // Should be location.circleRadius
      fillColor={circleColor}
      color={circleColor}
      weight={1}
      opacity={0.8}
      fillOpacity={0.5}
      eventHandlers={{
        click: () => handleLocationSelect(location),
      }}
    />
  );
}
export default RangeCircle;
