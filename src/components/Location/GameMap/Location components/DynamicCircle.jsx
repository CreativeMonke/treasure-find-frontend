import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const useDynamicCircle = ({
  center,
  radius,
  color,
  onClick,
  isInRange,
  answered,
  location,
}) => {
  const map = useMap();
  if (radius === undefined) radius = 130;
  useEffect(() => {
    const circle = L.circle(center, {
      radius,
      color,
      fillColor: color,
      fillOpacity: 0.5,
    }).addTo(map);
    if (onClick) {
      circle.on("click", () => {
        //    if (isInRange)
        //   {
        onClick();
        //} else {
        if (!answered) {
          // If the user is not in range, display a popup at the circle's location
          const popup = L.popup()
            .setLatLng(center)
            .setContent(`<p>${location.name}</p>`)
            .openOn(map);
          //   }
        }
      });
    }
    circle.setStyle({ color, fillColor: color });

    return () => {
      circle.remove();
    };
  }, [map, center, radius, color, onClick, isInRange, location]);
};

export default useDynamicCircle;
