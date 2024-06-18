import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useModal } from "../pages/Hunts/Context/modalContext";

function ConfirmationModal({ modalName }) {
  const { modalState, closeModal } = useModal();
  const { modalProps } = modalState;
  const [loading, setLoading] = useState(false);

  const {
    handleSave,
    title = "Confirmation",
    titleColor = "neutral",
    TitleIcon = InfoRoundedIcon,
    titleIconColor = "neutral",
    content = "Are you sure you want to proceed?",
    additionalInfo,
    AdditionalInfoIcon = InfoRoundedIcon,
    additionalInfoIconColor = "neutral",
    cancelText = "Cancel",
    cancelColor = "neutral",
    saveText = "Save",
    saveColor = "primary",
  } = modalProps;

  const handleSaveClick = async () => {
    setLoading(true);
    await handleSave();
    setTimeout(() => {
      setLoading(false);
      closeModal(modalName);
    }, 300);
  };

  function handleClose() {
    if (!loading) {
      closeModal(modalName);
    }
  }

  return (
    <React.Fragment>
      <Modal open={modalState[modalName]} onClose={handleClose}>
        <ModalDialog variant="outlined" role="alertdialog">
          <ModalClose variant="plain" size="md" onClick={handleClose} />
          <DialogTitle>
            <Typography
              level="title-lg"
              color={titleColor}
              startDecorator={<TitleIcon color={titleIconColor} />}
            >
              {title}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography level="body-md">
              {content}
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid container spacing={1.5} sx={{
              width: "100%",
              height: "100%",
            }}>
              <Grid item xs={6}>
                <Button
                  color={cancelColor}
                  onClick={handleClose}
                  disabled={loading}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {cancelText}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color={saveColor}
                  onClick={handleSaveClick}
                  loading={loading}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                {saveText}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
          <FormHelperText
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {additionalInfo && (
              <Typography
                level="body-xs"
                startDecorator={
                  <AdditionalInfoIcon color={additionalInfoIconColor} />
                }
              >
                {additionalInfo}
              </Typography>
            )}
          </FormHelperText>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default ConfirmationModal;
