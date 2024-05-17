import React, { useMemo, useState } from "react";
import Box from "@mui/joy/Box";
import "./Css/Home.css";
import MapWithLocations from "../Location/GameMap/MapWithLocation";
import { useDispatch, useSelector } from "react-redux";
import { getAnswersByUserId } from "../../features/answers/answerSlice";
import { LinearProgress } from "@mui/joy";
function Home() {
  const answers = useSelector((state) => state.answers.answers);
  const locations = useSelector((state) => state.locations.locations);
  const { huntState } = useSelector((state) => state.auth);
  const huntInfo = useSelector((state) => state.hunt);

  ///only
  const answeredIds = useMemo(
    () =>
      answers
        .filter((answer) => answer.hasBeenUpdated === true)
        .map((answer) => answer.locationId),
    [answers]
  );
  return (
    <Box
      className="page-root"
      backgroundColor="background.body"
      sx={{
        borderRadius: 7,
        opacity: 0.95
      }}
    >
      {huntInfo.status === "succeeded" ? (
        <MapWithLocations
          locations={locations}
          answeredIds={answeredIds}
          huntState={huntState}
          huntInfo={huntInfo}
        />
      ) : (
        <LinearProgress variant="plain" size="lg" />
      )}
    </Box>
  );
}

export default Home;
