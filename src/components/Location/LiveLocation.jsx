import React, { useState, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

const liveLocationIcon = new L.Icon({
    iconUrl: "./Icons/GpsArrow.png", // URL to your custom icon image
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon to ensure it points to the exact location
    popupAnchor: [1, -34], // Position of the popup relative to the icon
});

function LiveLocation()
{
    const [liveMarker,setLiveMarker] = useState(null);
    const map = useMap();
    
    useEffect(() => {
        function updateLiveLocation() {
            navigator.geolocation.watchPosition((location) =>{
                const {latitude,longitude} = location.coords;
                const latlng = L.latLng(latitude,longitude);

                if(liveMarker)
                {
                    liveMarker.setLatLng(latlng);
                }
                else
                {
                    const newLiveMarker = L.marker(latlng, {icon: liveLocationIcon})
                    .addTo(map)
                    .bindPopup("You are here");

                    setLiveMarker(newLiveMarker);
                }
            },(err)=>{
                console.error(err);
            },{
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000,
            });
        }

        updateLiveLocation();

        return() =>{
            if(liveMarker)
            liveMarker.remove();
        };
    },[map,liveMarker]);
    return null;
}   

export default LiveLocation;