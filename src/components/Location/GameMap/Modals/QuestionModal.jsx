import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  Divider,
  DialogContent,
  FormControl,
  FormLabel,
  Typography,
  Textarea,
  FormHelperText,
  Button,
  DialogActions,
  CircularProgress,
} from "@mui/joy";
import { InfoRounded, PlaceRounded, QuizRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentAnswerId,
  getAnswer,
  getAnswersByUserId,
  submitAnswer,
  updateAnswerById,
} from "../../../../features/answers/answerSlice";
import { useTranslation } from "react-i18next";

function QuestionModal(props) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasError, setHasError] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [hasBeenUpdated, setHasBeenUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false); // State to control question visibility
  const dispatch = useDispatch();
  const currentAnswerId = useSelector((state) => state.answers.currentAnswerId);
  const userId = useSelector((state) => state.auth.user[0]._id); // Adjust according to your state shape
  const {t} = useTranslation();
  useEffect(() => {
    if (props.open) {
      dispatch(getAnswer(props.locationId))
        .unwrap()
        .then((action) => {
          if (action && action.data) {
            // Answer exists; show question and calculate time left
            setShowQuestion(true);
            setUserAnswer(action.data.answer);
            setHasBeenUpdated(action.data.hasBeenUpdated);
            setTimeLeft(calculateTimeLeft(action.data.createdAt));
          }
          // If no answer exists, wait for user action to show question
        })
        .catch((err) => console.error("Failed to fetch answer:", err));
    }
    return () => {
      dispatch(clearCurrentAnswerId());
    };
  }, [props.open, dispatch, props.locationId]);

  const calculateTimeLeft = (createdAt) => {
    const creationTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    const elapsed = (currentTime - creationTime) / 1000; // in seconds
    const remaining = 5 * 60 - elapsed; // 5 minutes limit
    return remaining > 0 ? Math.round(remaining) : 0;
  };

  const handleShowQuestionClick = () => {
    setShowQuestion(true);
    if (!currentAnswerId) {
      // No existing answer; submit a preliminary answer
      const preliminaryAnswer = {
        question: props.question,
        answer: " ",
        userId: userId,
        locationId: props.locationId,
      };
      dispatch(submitAnswer(preliminaryAnswer));
    }
    setTimeLeft(5 * 60); // Start the timer
    setTimerExpired(false);
  };

  useEffect(() => {
    if (timeLeft !== null) {
      if (timeLeft <= 0) {
        setTimerExpired(true);
        return;
      }
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTimeLeft = () => {
    if (!showQuestion) {
      return t("showQuestionAlert");
    }
    if (timerExpired) {
      return t("timeExpired");
    }
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds} ${t("timeLeftText")}`;
  };

  const handleAnswerChange = (evt) => {
    setUserAnswer(evt.target.value);
    setHasError(!evt.target.value);
  };

  const handleSubmitAnswer = async () => {
    setIsLoading(true);
    if (!userAnswer.trim() || timerExpired) {
      setHasError(true);
      setIsLoading(false);
      console.log("Cannot submit answer: Time expired or no answer provided.");
      return;
    }

    try {
      await dispatch(
        updateAnswerById({
          answerId: currentAnswerId,
          answerData: { answer: userAnswer },
        })
      ).unwrap();
      console.log("Answer submitted: ", userAnswer);
      props.handleClose();
    } catch (error) {
      console.error("Failed to update answer:", error);
    } finally {
      setIsLoading(false);
      dispatch(getAnswersByUserId()); 
    }
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <ModalDialog
        layout="center"
        sx={{
          width: "60%",
          maxWidth: "500px",
          maxHeight: "600px",
        }}
      >
        <ModalClose variant="plain" size="md" />
        <DialogTitle id="modalTitle">
          <PlaceRounded />
          <Typography color="primary" level="title-lg">
            {props.name}
          </Typography>
        </DialogTitle>
        <Divider sx={{ mt: 1, mb: 1 }}>{hasBeenUpdated?t("answerAlreadySubmitted") : formatTimeLeft()}</Divider>
        <DialogContent>
          <FormControl>
            <FormLabel sx={{ mb: 2, width: "100%" }}>
              {showQuestion ? (
                <Typography level="title-lg">{props.question}</Typography>
              ) : (
                <Button
                  size="lg"
                  variant="soft"
                  color="neutral"
                  startDecorator={<QuizRounded />}
                  endDecorator={<QuizRounded />}
                  sx={{ width: "100%" }}
                  onClick={handleShowQuestionClick}
                >
                  {t("showQuestion")}
                </Button>
              )}
            </FormLabel>
            {showQuestion && (
              <>
                <Textarea
                  disabled={timerExpired || !showQuestion || hasBeenUpdated}
                  error={hasError}
                  variant="soft"
                  size="lg"
                  minRows={6}
                  placeholder= {t("emptyErrorMessage")}
                  value={userAnswer}
                  onChange={handleAnswerChange}
                />
                {!hasBeenUpdated && (
                  <FormHelperText>
                    <Typography level = "body-xs" startDecorator = {<InfoRounded />}>
                    {t("actionUndoable")}
                    </Typography>
                  </FormHelperText>
                )}
              </>
            )}
          </FormControl>
        </DialogContent>

        <DialogActions>
          
          {showQuestion && (
            <Button
              disabled={
                timerExpired ||
                !userAnswer.trim() ||
                hasBeenUpdated ||
                isLoading
              }
              sx={{ width: "100%", mt: 2 }}
              onClick={handleSubmitAnswer}
              loading = {isLoading}
            >
              {isLoading ? "Submitting..." :t("saveAnswer")}
            </Button>
          )}
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default QuestionModal;
