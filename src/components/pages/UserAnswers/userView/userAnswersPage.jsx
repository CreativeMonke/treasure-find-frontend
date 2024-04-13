import React, { useEffect } from "react";
import { Sheet, Typography, Divider , Box} from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import HuntTimeline from "./HuntTimeline";
import { getAnswersByUserId } from "../../../../features/answers/answerSlice";
import "react-vertical-timeline-component/style.min.css";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
function UserAnswersPage() {
  const { t } = useTranslation();
  const { hasEnded } = useSelector((state) => state.hunt);
  const {answersReady} = useSelector((state) => state.hunt.globalHuntInfo);
  console.log(answersReady);
  return (
    <Sheet
      variant="outlined"
      sx={{
        height: "100%",
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
      {hasEnded && answersReady? (
        <HuntTimeline />
      ) : (
        <Box sx = {{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          width: "100%",
          height: "100%",
        }}>
          {!hasEnded?
          <Typography level = "h2" color = "warning">
            {t("moreInfoAfterEnd")}
          </Typography>
          :
          <Typography level = "h2" color = "warning">
          {t("responsesWaitingMsg")}
        </Typography>
}
        </Box>
      )}
    </Sheet>
  );
}

export default UserAnswersPage;
