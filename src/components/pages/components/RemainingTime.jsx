import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { setHasEnded, toggleHasEnded } from "../../../features/hunt/huntSlice";

function RemainingTime() {
  const { globalHuntInfo } = useSelector((state) => state.hunt);
  const [color, setColor] = useState("primary");
  const [timeLeft, setTimeLeft] = useState("");
  const [eventStatus, setEventStatus] = useState("upcoming"); // Handle event status
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const endTime = new Date(globalHuntInfo.endTime).getTime();
      const startTime = new Date(globalHuntInfo.startTime).getTime();

      if (now > endTime) {
        clearInterval(timer); // Stop the timer after event has ended
        setTimeLeft(t("eventEnded"));
        dispatch(setHasEnded());
        setColor("default"); // Set color to default or another indicating the event is over
        setEventStatus("ended");
      } else if (now >= startTime) {
        const remainingTime = endTime - now;
        const isEndingSoon = remainingTime < 30 * 60 * 1000; // Less than 30 minutes
        setColor(isEndingSoon ? "danger" : "success");
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTimeLeft(`${hours}${t("hours")} ${minutes}${t("minutes")} ${seconds}${t("seconds")}`);
        setEventStatus("ongoing");
      } else {
        const remainingTime = startTime - now;
        setColor("info");
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTimeLeft(`${hours}${t("hours")} ${minutes}${t("minutes")} ${seconds}${t("seconds")}`);
        setEventStatus("upcoming");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [globalHuntInfo.endTime, globalHuntInfo.startTime, t]);

  const prefix = eventStatus === "upcoming" ? t("startingIn") : eventStatus === "ongoing" ? t("endingIn") : "";

  return (
    <Typography level="body-md" color={color}>
      {eventStatus !== "ended" ? `${prefix} ${timeLeft}` : timeLeft}
    </Typography>
  );
}

export default RemainingTime;
