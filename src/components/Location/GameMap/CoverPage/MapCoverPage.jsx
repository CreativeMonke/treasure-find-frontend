import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";
import NoLocationComponent from "./ErrorComponents/NoLocation";
import NotStartedHuntComponent from "./ErrorComponents/NotStartedHuntComponent";
import HasEndedHuntComponent from "./ErrorComponents/HasEndedHuntComponent";
function MapCoverPage({ userLocationError, huntState }) {
  const [errorMsg, setErrorMsg] = useState("");

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
      {!huntState.hasStartedHunt ? (
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
