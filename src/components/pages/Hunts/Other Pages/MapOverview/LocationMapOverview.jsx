import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import MuiToSvgIcon from "../../../../General/MuiToSvgIcon";
import { PlaceRounded } from "@mui/icons-material";
import TimelineCard from "../../../../Poi/TimelineCard";
import "./Popup.css";
const customIcon = MuiToSvgIcon({ name: PlaceRounded, color: "primary" });

function LocationMarkers({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((location) => [location.lat, location.lng])
      );
      map.fitBounds(bounds);
    }
  }, [locations, map]);

  return (
    <React.Fragment>
      {locations.map((location) => (
        <Marker
          key={location._id}
          position={[location.lat, location.lng]}
          icon={customIcon}
        >
          <Popup className="custom-popup">
            <TimelineCard
              key={location._id}
              name={location.name}
              pic={location.imgSrc}
              desc={location.desc}
            />
          </Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
}

function LocationMapOverview({ locations }) {
  const mapRef = useRef(null);
  return (
    <React.Fragment>
      <MapContainer
        style={{ width: "100%", height: "100%", minHeight: "60dvh" }}
        zoomControl={false}
        dragging={false}
        boxZoom={false}
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        touchZoom={false}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarkers locations={locations} />
      </MapContainer>
    </React.Fragment>
  );
}

export default LocationMapOverview;
