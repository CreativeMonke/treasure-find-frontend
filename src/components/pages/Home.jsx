import React, { useMemo, useState } from "react";
import Box from "@mui/joy/Box";
import "./Css/Home.css";
import MapWithLocations from "../Location/GameMap/MapWithLocation";
import { useDispatch, useSelector } from "react-redux";
import { getAnswersByUserId } from "../../features/answers/answerSlice";
function Home() {
  const answers = useSelector((state) => state.answers.answers);
  const locations = useSelector((state) => state.locations.locations);
  ///only
  const answeredIds = useMemo(
    () =>
      answers
        .filter((answer) => answer.hasBeenUpdated === true)
        .map((answer) => answer.locationId),
    [answers]
  );
  return (
    <Box className="page-root" backgroundColor="background.body">
      <MapWithLocations locations={locations} answeredIds={answeredIds} />
    </Box>
  );
}

export default Home;
