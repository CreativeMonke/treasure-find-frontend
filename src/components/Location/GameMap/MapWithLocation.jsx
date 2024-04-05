import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { useLocations } from "../../pages/Locations/Context/LocationContext";
import QuestionModal from "./Modals/QuestionModal";
import L from "leaflet";
import "leaflet-geometryutil";
import { Sheet } from "@mui/joy";
import LiveLocationTracker from "./LiveLocation/LiveLocation";
import { useNavigate } from "react-router-dom";
import RangeCircle from "./Location components/RangeCompontent";
///Placeholder -> api querry answerByUserId
const answered = [1, 0, 3, 4, 5, 6, 7, 8, 9];
function MapWithLocations() {
  const { locations } = useLocations();
  const [activeLocation, SetActiveLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  function handleLocationSelect(location) {
    SetActiveLocation(location);
  }
  function closeModal() {
    SetActiveLocation(null);
  }
  async function handleSubmitAnswer(evt) {
    ///Submit answer to backend
    console.log(evt);
    closeModal();
  }

  return (
    <Sheet
      variant="soft"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "10px",
      }}
    >
      <MapContainer
        center={[47.1564288, 27.5841024]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <RangeCircle
            key={location.id}
            answered={answered[index]}
            location={location}
            userLocation={userLocation}
            handleLocationSelect={handleLocationSelect}
          />
        ))}
        <LiveLocationTracker
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      </MapContainer>
      {activeLocation && (
        <QuestionModal
          open={Boolean(activeLocation)}
          handleClose={closeModal}
          handleSubmit={handleSubmitAnswer}
          question={activeLocation.question}
          name={activeLocation.name}
        />
      )}
    </Sheet>
  );
}

export default MapWithLocations;
