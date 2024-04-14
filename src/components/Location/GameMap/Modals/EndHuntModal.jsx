import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  Divider,
  DialogContent,
  FormHelperText,
  Button,
  DialogActions,
  CircularProgress,
  Typography,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { ErrorOutlineRounded, InfoRounded } from "@mui/icons-material";
import { endHunt } from "../../../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
function EndHuntModal({ showEndHuntModal, handleEndHuntModalClose }) {
  ///A countDown of 10s
  const [countDown, setCountDown] = useState(10); // Countdown starts at 10 seconds
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nrOfAnswers = Object.keys(
    useSelector((state) => state.answers.answers)
  ).length;
  async function handleDeleteClick() {
    dispatch(endHunt())
      .unwrap()
      .then(() => {
        handleEndHuntModalClose();
      });
  }

  useEffect(() => {
    let timer;
    if (showEndHuntModal && countDown > 0) {
      timer = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);
    } else if (countDown <= 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup on unmount or modal close
  }, [showEndHuntModal, countDown]);
  return (
    <Modal open={!!showEndHuntModal} onClose={handleEndHuntModalClose}>
      <ModalDialog
        layout="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalClose variant="plain" size="md" />
        <DialogTitle>
          <Typography
            level="title-lg"
            color="danger"
            startDecorator={<ErrorOutlineRounded />}
          >
            {t("endHunt")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: 800,
          }}
        >
          <Typography level="title-md">{t("confirmHuntEnd")}</Typography>
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
            {t("providedResponses")}{" "}
            <Typography color="primary" level="body-md" sx={{ mx: 1 }}>
              {nrOfAnswers}
            </Typography>
            {t("outOf")}
            <Typography color="primary" level="body-md" sx={{ mx: 1 }}>
              12
            </Typography>
            {t("locationsLowerCase")}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button onClick={handleEndHuntModalClose} size="lg">
            {t("cancel")}
          </Button>
          <Button
            onClick={handleDeleteClick}
            size="lg"
            color="danger"
            disabled={countDown > 0}
            endDecorator={countDown}
          >
            {t("endHunt")}
          </Button>
        </DialogActions>
        <FormHelperText>
          <Typography level="body-xs" startDecorator={<InfoRounded />}>
            {t("actionUndoable")}
          </Typography>
        </FormHelperText>
      </ModalDialog>
    </Modal>
  );
}

export default EndHuntModal;
