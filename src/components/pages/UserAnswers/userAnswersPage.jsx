import React, { useEffect } from "react";
import { Sheet } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import HuntTimeline from "./HuntTimeline";
import { getAnswersByUserId } from "../../../features/answers/answerSlice";
import "react-vertical-timeline-component/style.min.css";

function UserAnswersPage() {
  const { hasEnded } = useSelector((state) => state.hunt);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnswersByUserId);
  });
  return (
    <Sheet
      variant="outlined"
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <HuntTimeline />
    </Sheet>
  );
}

export default UserAnswersPage;
