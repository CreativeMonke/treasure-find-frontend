import React, { useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useDispatch, useSelector } from "react-redux";
import TimelineCard from "./TimelineComponent";
import { getAnswersByUserId } from "../../../../features/answers/answerSlice";

function HuntTimeline(props) {
  const { locations } = useSelector((state) => state.locations);
  const dispatch = useDispatch();

 /* useEffect(() => {
    dispatch(getAnswersByUserId);
  });
  */
  const { hasEnded } = useSelector((state) => state.hunt);
  const { answers } = useSelector((state) => state.answers);
  function getAnswerByLocation(location) {
    return answers.find((answer) => answer.locationId === location._id);
  }
  return (
    <VerticalTimeline
      lineColor="var(--joy-palette-primary-600, #0B6BCB)"
      layout="1-column-left"
    >
      {locations.map((location, index) => (
        <TimelineCard
          location={location}
          answer={getAnswerByLocation(location)}
          hasEnded={hasEnded}
        />
      ))}
    </VerticalTimeline>
  );
}
export default HuntTimeline;
