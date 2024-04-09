import React, {  useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import QuestionModal from "./Modals/QuestionModal";
import "leaflet/dist/leaflet.css";
import "leaflet-geometryutil";
import { Sheet } from "@mui/joy";
import LiveLocationTracker from "./LiveLocation/LiveLocation";
import RangeCircle from "./Location components/RangeCompontent";
import { clearCurrentAnswerId } from "../../../features/answers/answerSlice.js";

///Placeholder -> api querry answerByUserId
//const answered = [1, 0, 3, 4, 5, 6, 7, 8, 9];
function MapWithLocations({ locations, answeredIds }) {
  ///for each location, check the id in the answeredIds array and if there is one, answered[locationINdex] = 1

  // const locations = useSelector((state) => state.locations.locations);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Determine if locations have been answered based on `answeredIds`
  const answered = locations.map((location) =>
    answeredIds.includes(location._id) ? 1 : 0
  );

  // Handles location selection, potentially activating a location based on proximity
  function handleLocationSelect(location, distance) {
   console.log(location);
    if (distance <= location.radius || answeredIds.includes(location._id)) {
      setActiveLocation(location);
    }
  }

  // Closes the modal and clears the current answer ID from Redux state
  function closeModal() {
    dispatch(clearCurrentAnswerId());
    setActiveLocation(null);
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
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <RangeCircle
            id={location._id}
            key={location._id}
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
          hasBeenUpdated={activeLocation.hasBeenUpdated}
          handleClose={closeModal}
          locationId={activeLocation._id}
          question={activeLocation.question}
          name={activeLocation.name}
        />
      )}
    </Sheet>
  );
}

export default MapWithLocations;
