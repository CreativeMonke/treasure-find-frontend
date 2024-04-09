import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

function RemainingTime() {
  const { globalHuntInfo } = useSelector((state) => state.hunt);
  const [color, setColor] = useState("primary");
  const [timeLeft, setTimeLeft] = useState("");
  const { t } = useTranslation(); // Initialize the hook
  let prefix = "";

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const endTime = new Date(globalHuntInfo.endTime).getTime();
      const startTime = new Date(globalHuntInfo.startTime).getTime();

      let remainingTime, isEndingSoon;
      if (now < startTime) {
        // Before event starts
        remainingTime = startTime - now;
        setColor("info"); // Blue color for starting time
      } else {
        // During the event
        remainingTime = endTime - now;
        isEndingSoon = remainingTime < 60 * 60 * 1000; // less than an hour
        setColor(isEndingSoon ? "danger" : "success"); // Red if ending soon, green otherwise
      }

      // Update time left
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft(
        `${hours}${t("hours")} ${minutes}${t("minutes")} ${seconds}${t(
          "seconds"
        )}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [globalHuntInfo.endTime, globalHuntInfo.startTime, t]); // Add t to dependencies

  if (globalHuntInfo.startTime && globalHuntInfo.endTime) {
    const now = Date.now();
    const startTime = new Date(globalHuntInfo.startTime).getTime();
    prefix = now < startTime ? t("startingIn") : t("endingIn");
  }

  return (
    <Typography level="body-md" color={color}>
      {prefix} {timeLeft}
    </Typography>
  );
}

export default RemainingTime;
