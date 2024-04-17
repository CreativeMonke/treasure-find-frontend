import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { setHasEnded } from "../../../features/hunt/huntSlice";

function RemainingTime() {
  const { globalHuntInfo } = useSelector((state) => state.hunt);
  const [color, setColor] = useState("primary");
  const [timeLeft, setTimeLeft] = useState("");
  const [eventStatus, setEventStatus] = useState("upcoming");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const endTime = new Date(globalHuntInfo.endTime).getTime();
      const startTime = new Date(globalHuntInfo.startTime).getTime();

      if (now > endTime) {
        clearInterval(timer);
        setTimeLeft(t("eventEnded"));
        dispatch(setHasEnded());
        setColor("default");
        setEventStatus("ended");
      } else {
        const remainingTime = (now >= startTime) ? (endTime - now) : (startTime - now);
        const isEndingSoon = remainingTime < 30 * 60 * 1000; // Less than 30 minutes
        setColor(isEndingSoon ? "danger" : "success");
        setEventStatus(now >= startTime ? "ongoing" : "upcoming");

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        let timeString = "";

        if (days > 0) {
          timeString += `${days}${t("days")} `;
          if (hours > 0) {
            timeString += `${hours}${t("hours")} `;
          }
        } else {
          if (hours > 0) {
            timeString += `${hours}${t("hours")} `;
          }
          if (minutes > 0) {
            timeString += `${minutes}${t("minutes")} `;
          }
          if (seconds > 0 && hours === 0) { // Show seconds only if hours are zero
            timeString += `${seconds}${t("seconds")}`;
          }
        }

        setTimeLeft(timeString.trim());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [globalHuntInfo.endTime, globalHuntInfo.startTime, t , dispatch]);

  const prefix = eventStatus === "upcoming" ? t("startingIn") : eventStatus === "ongoing" ? t("endingIn") : "";

  return (
    <Typography level="body-md" color={color}>
      {eventStatus !== "ended" ? `${prefix} ${timeLeft}` : timeLeft}
    </Typography>
  );
}

export default RemainingTime;
