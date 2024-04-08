import React, { Fragment, useEffect, useState } from "react";
import { Circle, useMap } from "react-leaflet";
import L from "leaflet";
import useDynamicCircle from "./DynamicCircle";
const circleColors = {
  accessible: "var(--joy-palette-primary-500)",
  notAccessible: "var(--joy-palette-neutral-500)",
  answered: "var(--joy-palette-success-500)",
};

function RangeCircle({
  answered,
  userLocation,
  location,
  handleLocationSelect,
}) {
  const map = useMap();
  const [circleColor, setCircleColor] = useState(circleColors.notAccessible);

  useEffect(() => {
    //console.log("Effect running", { answered, userLocation, location });

    if (answered) {
      //console.log("Answered, setting to answered color");

      setCircleColor(circleColors.answered);
    } else {
      // Update circle color based on user proximity
      const distance = userLocation
        ? L.GeometryUtil.distance(
            map,
            L.latLng(userLocation),
            L.latLng(location.lat, location.lng)
          )
        : Infinity;
      //console.log("Distance:", distance, "Radius:", location.radius);
      setCircleColor(
        distance <= location.radius
          ? circleColors.accessible
          : circleColors.notAccessible
      );
    }
  }, [answered, userLocation, location, map]);

  return (
    <Fragment>
      {useDynamicCircle({
        center: [location.lat, location.lng],
        radius: location.radius,
        color: circleColor,
        onClick: () => handleLocationSelect(location),
      })}
    </Fragment>
  );
}

export default RangeCircle;
