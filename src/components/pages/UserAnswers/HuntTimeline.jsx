import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSelector } from "react-redux";
import TimelineCard from "./TimelineComponent";

function HuntTimeline(props) {
  const { locations } = useSelector((state) => state.locations);
  const { hasEnded } = useSelector((state) => state.hunt.hasEnded);
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
