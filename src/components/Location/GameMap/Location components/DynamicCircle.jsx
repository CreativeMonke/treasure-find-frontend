import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const useDynamicCircle = ({ center, radius, color, onClick }) => {
  const map = useMap();
  if (radius === undefined) radius = 130;
  useEffect(() => {
    // Create the circle with initial properties
    const circle = L.circle(center, {
      radius,
      color,
      fillColor: color,
      fillOpacity: 0.5,
    }).addTo(map);

    // Set up click event if provided
    if (onClick) {
      circle.on("click", onClick);
    }

    // Update the circle's color whenever it changes
    // This is the key for dynamic updates
    circle.setStyle({ color, fillColor: color });

    // Cleanup function to remove the circle from the map when the component unmounts or props change
    return () => {
      circle.remove();
    };
  }, [map, center, radius, color, onClick]); // Re-run this effect if any of these dependencies change

  // Nothing is returned since this hook directly manipulates the map
};

export default useDynamicCircle;
