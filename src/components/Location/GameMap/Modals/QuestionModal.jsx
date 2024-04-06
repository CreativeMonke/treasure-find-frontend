import React, { useState, useEffect } from "react";
import { Modal, ModalDialog, ModalClose, DialogTitle, Divider, DialogContent, FormControl, FormLabel, Typography, Textarea, FormHelperText, Button } from "@mui/joy";
import { PlaceRounded, QuizRounded } from "@mui/icons-material";

function QuestionModal(props) {
  const [timeLeft, setTimeLeft] = useState(null); // null indicates the timer hasn't started
  const [userAnswer, setUserAnswer] = useState('');
  const [hasError, setHasError] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Start the timer when the modal opens and "Show question" is clicked
  useEffect(() => {
    if (timeLeft === null) {
      return;
    }

    // If timeLeft is 0, stop the timer
    if (timeLeft <= 0) {
      setTimerExpired(true);
      return;
    }

    // Countdown
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup on component unmount or when timeLeft changes
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format the timer text
  const formatTimeLeft = () => {
    if (timeLeft === null) {
      return "Click to show question";
    }
    if (timerExpired) {
      return "Time has expired!";
    }
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds} left`;
  };

  const handleShowQuestion = () => {
    setTimeLeft(5 * 60); // 5 minutes countdown
    setTimerExpired(false);
  };

  const handleAnswerChange = (evt) => {
    const value = evt.target.value;
    setUserAnswer(value);
    setHasError(!value);
  };

  const handleSubmitAnswer = () => {
    if (timerExpired || !userAnswer) {
      console.log("Cannot submit answer: Time expired or no answer provided.");
      return;
    }
    // Submit answer logic here
    console.log("Answer submitted:", userAnswer);
    props.handleClose();
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <ModalDialog layout="center" sx={{ width: "60%", maxWidth: "500px", maxHeight: "600px" }}>
        <ModalClose variant="plain" size="md" />
        <DialogTitle id="modalTitle">
          <PlaceRounded />
          {props.name}
        </DialogTitle>
        <Divider sx={{ mt: 1, mb: 1 }}>{formatTimeLeft()}</Divider>
        <DialogContent>
          <FormControl>
            <FormLabel sx={{ mb: 2, width: "100%" }}>
              {timeLeft !== null ? (
                <Typography level="title-lg">{props.question}</Typography>
              ) : (
                <Button
                  size="lg"
                  variant="soft"
                  color="neutral"
                  startDecorator={<QuizRounded />}
                  endDecorator={<QuizRounded />}
                  sx={{ width: "100%" }}
                  onClick={handleShowQuestion}
                >
                  Show question
                </Button>
              )}
            </FormLabel>
            <Textarea
              disabled={timerExpired || timeLeft === null}
              error={hasError}
              variant="soft"
              size="lg"
              minRows={6}
              placeholder={hasError ? "Cannot be empty!" : "Type your answer here..."}
              value={userAnswer}
              onChange={handleAnswerChange}
            />
            <FormHelperText>This answer cannot be retracted!</FormHelperText>
          </FormControl>
        </DialogContent>
        <Button disabled={timerExpired || !userAnswer} sx={{ width: "100%" }} onClick={handleSubmitAnswer}>
          Save answer
        </Button>
      </ModalDialog>
    </Modal>
  );
}

export default QuestionModal;
