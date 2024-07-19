import React, { Fragment, useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import QuestionModal from "./Modals/QuestionModal";
import "leaflet/dist/leaflet.css";
import "leaflet-geometryutil";
import { Sheet, IconButton } from "@mui/joy";
import LiveLocationTracker from "./LiveLocation/LiveLocation";
import RangeCircle from "./Location components/RangeCompontent";
import { clearCurrentAnswerId } from "../../../features/answers/answerSlice.js";
import MapCoverPage from "./CoverPage/MapCoverPage.jsx";
import { StopCircleRounded } from "@mui/icons-material";
import EndHuntModal from "./Modals/EndHuntModal.jsx";
import JoinHuntNow from "./CoverPage/JoinHuntNow";
function MapWithLocations({ locations, answeredIds, huntState, huntInfo }) {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [userLocation, setUserLocation] = useState([1, 1]);
  const [showEndHuntModal, setShowEndHuntModal] = useState(false);

  const answered = locations.map((location) =>
    answeredIds.includes(location._id) ? 1 : 0
  );

  const handleLocationSelect = (location, distance) => {
    if (distance <= location.radius || answeredIds.includes(location._id)) {
      setActiveLocation(location);
    }
  };

  const closeModal = () => {
    dispatch(clearCurrentAnswerId());
    setActiveLocation(null);
  };

  const toggleEndHuntModal = () => {
    setShowEndHuntModal(!showEndHuntModal);
  };

  const renderMap = () => (
    <Fragment>
      <MapContainer
        center={[47.15728152, 27.58697648]}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
        <IconButton
          variant="soft"
          color="danger"
          size="lg"
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 1000,
          }}
          onClick={toggleEndHuntModal}
        >
          <StopCircleRounded />
        </IconButton>
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
      {showEndHuntModal && (
        <EndHuntModal
          showEndHuntModal={showEndHuntModal}
          handleEndHuntModalClose={toggleEndHuntModal}
        />
      )}
    </Fragment>
  );

  const shouldRenderMap = () => {
    return (
      userLocation &&
      huntState?.hasStartedHunt &&
      !huntState.hasEndedHunt &&
      !huntInfo?.hasEnded &&
      huntInfo?.hasStarted
    );
  };

  const renderContent = () => {
    if (!huntState || huntState.length === 0) {
      return <JoinHuntNow />;
    }
    return shouldRenderMap() ? renderMap() : (
      <MapCoverPage
        userLocationError={!!userLocation}
        huntState={huntState}
        huntInfo={huntInfo}
      />
    );
  };

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
      {renderContent()}
    </Sheet>
  );
}

export default MapWithLocations;
