import React from "react";
import { Box, Link } from "@mui/joy";
import NoLocationComponent from "./ErrorComponents/NoLocation";
import NotStartedHuntComponent from "./ErrorComponents/NotStartedHuntComponent";
import HasEndedHuntComponent from "./ErrorComponents/HasEndedHuntComponent";
import EventErrors from "./ErrorComponents/EventErrors";
import { OpenInNewRounded } from "@mui/icons-material";

function MapCoverPage({ userLocationError, huntState, huntInfo }) {
  const { hasStarted, hasEnded } = huntInfo;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1
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
      {hasEnded && hasStarted && (
        <Link
          level="title-lg"
          underline="none"
          variant="plain"
          startDecorator={<OpenInNewRounded />}
          href="https://forms.gle/dQQVhdwSoirkcBdc9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feedback
        </Link>
      )}
    </Box>
  );
}

export default MapCoverPage;
