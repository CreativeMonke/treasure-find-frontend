import React from "react";
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
function EndHuntModal({ showEndHuntModal, handleEndHuntModalClose }) {
  ///A countDown of 10s
  const dispatch = useDispatch();
  const nrOfAnswers = Object.keys(
    useSelector((state) => state.answers.answers)
  ).length;
  async function handleDeleteClick() {
    dispatch(endHunt()).unwrap().then(() => {
        handleEndHuntModalClose();
  
    });
  }
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
            End Hunt
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
          <Typography level="title-md">
            Are you sure you want to end this hunt?
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
            You only provided a response to
            <Typography color="primary" level="body-md" sx={{ mx: 1 }}>
              {nrOfAnswers}
            </Typography>
            out of
            <Typography color="primary" level="body-md" sx={{ mx: 1 }}>
              12
            </Typography>
            locations.
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
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} size="lg" color="danger">
            End Hunt
          </Button>
        </DialogActions>
        <FormHelperText>
          <Typography level="body-xs" startDecorator={<InfoRounded />}>
            This action cannot be undone!
          </Typography>
        </FormHelperText>
      </ModalDialog>
    </Modal>
  );
}

export default EndHuntModal;
