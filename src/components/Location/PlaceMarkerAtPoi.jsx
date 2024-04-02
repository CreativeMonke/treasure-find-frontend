import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { useLocations } from '../pages/Locations/Context/LocationContext';
import { useMap } from 'react-leaflet';

function PlaceMarkerAtLocations() {
    const { locations } = useLocations();
    const map = useMap();

    useEffect(() => {
        if (!locations || locations.length === 0) return;

        // Create markers for all locations and store them in an array
        const markers = locations.map((location) => 
            L.marker(location.latlng, { title: location.name })
                .addTo(map)
                .bindPopup(location.name)
        );

        // This function will be called when the component is unmounted or when locations change
        return () => {
            markers.forEach(marker => map.removeLayer(marker)); // Remove all markers
        };
    }, [locations, map]); // Effect dependencies

    return null; // This component does not render anything itself
}

export default PlaceMarkerAtLocations;
