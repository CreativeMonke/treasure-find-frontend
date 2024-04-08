import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/joy";

function RemainingTime() {
  const { globalHuntInfo } = useSelector((state) => state.hunt);
  const [color, setColor] = useState("primary");
  const [prefix, setPrefix] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const endTime = new Date(globalHuntInfo.endTime).getTime();
      const startTime = new Date(globalHuntInfo.startTime).getTime();

      let remainingTime, isEndingSoon;
      if (now < startTime) {
        // Before event starts
        remainingTime = startTime - now;
        setPrefix("Starting in:");
        setColor("info"); // Blue color for starting time
      } else {
        // During the event
        remainingTime = endTime - now;
        setPrefix("Ending in:");
        isEndingSoon = remainingTime < 60 * 60 * 1000; // less than an hour
        setColor(isEndingSoon ? "danger" : "success"); // Red if ending soon, green otherwise
      }

      // Update time left
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [globalHuntInfo.endTime, globalHuntInfo.startTime]);

  return (
    <Typography level="body-md" color={color}>
      {prefix} {timeLeft}
    </Typography>
  );
}

export default RemainingTime;
