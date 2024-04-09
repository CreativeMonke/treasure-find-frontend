import React, { Fragment, useEffect, useState } from "react";
import { Circle, useMap } from "react-leaflet";
import L from "leaflet";
import getDistance from "geolib/es/getDistance";
import useDynamicCircle from "./DynamicCircle";
const circleColors = {
  accessible: "var(--joy-palette-primary-500)",
  notAccessible: "var(--joy-palette-neutral-500)",
  answered: "var(--joy-palette-success-500)",
};

function RangeCircle({ answered, userLocation, location, handleLocationSelect }) {
  const [circleColor, setCircleColor] = useState(circleColors.notAccessible);
  const [distance, setDistance] = useState(null);
  const [isInRange, setIsInRange] = useState(false);
  useEffect(() => {
    if (answered) {
      setCircleColor(circleColors.answered);
    } else if (userLocation) {
      const distanceToLocation = getDistance(
        { latitude: userLocation[0], longitude: userLocation[1] },
        { latitude: location.lat, longitude: location.lng }
      );
      setIsInRange(distanceToLocation<=location.radius);
      setDistance(distanceToLocation);
      setCircleColor(
        isInRange ? circleColors.accessible : circleColors.notAccessible
      );
    }
  }, [answered, userLocation, location]);

  return (
    <Fragment>
    {useDynamicCircle({
      center: [location.lat, location.lng],
      radius: location.radius,
      color: circleColor,
      onClick: () => handleLocationSelect(location, distance),
      isInRange,
      answered,
      location
    })}
  </Fragment>
  );
}

export default RangeCircle;
