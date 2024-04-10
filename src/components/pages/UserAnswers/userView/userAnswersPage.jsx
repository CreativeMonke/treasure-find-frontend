import React, { useEffect } from "react";
import { Sheet, Typography, Divider } from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import HuntTimeline from "./HuntTimeline";
import { getAnswersByUserId } from "../../../../features/answers/answerSlice";
import "react-vertical-timeline-component/style.min.css";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
function UserAnswersPage() {
  const { t } = useTranslation();
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
        gap: 2,
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <Typography level="h1" sx={{ width: "100%", textAlign: "center", pt: 1 }}>
        {t("myAnswers")}
      </Typography>
      <Divider>
        <KeyboardArrowDownRounded />
      </Divider>
      <HuntTimeline />
    </Sheet>
  );
}

export default UserAnswersPage;
