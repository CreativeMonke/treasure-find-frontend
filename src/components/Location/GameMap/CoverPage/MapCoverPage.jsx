import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";
import NoLocationComponent from "./ErrorComponents/NoLocation";
import NotStartedHuntComponent from "./ErrorComponents/NotStartedHuntComponent";
import HasEndedHuntComponent from "./ErrorComponents/HasEndedHuntComponent";
import EventNotStarted from "./ErrorComponents/EventErrors";
import EventErrors from "./ErrorComponents/EventErrors";
function MapCoverPage({ userLocationError, huntState, huntInfo }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { hasStarted, hasEnded } = huntInfo;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!hasStarted || hasEnded ? (
        <EventErrors hasStarted={hasStarted} hasEnded={hasEnded} />
      ) : !huntState.hasStartedHunt ? (
        <NotStartedHuntComponent />
      ) : huntState.hasEndedHunt ? (
        <HasEndedHuntComponent />
      ) : !userLocationError ? (
        <NoLocationComponent />
      ) : (
        "How did you get here?"
      )}
    </Box>
  );
}

export default MapCoverPage;
