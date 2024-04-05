import { PlaceRounded } from "@mui/icons-material";
import { DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
import React from "react";

///Modal to ask the user to answer a question about the current location
function QuestionModal(props) {
  return (
    <Modal open={props.open} onClose={(evt) => props.handleClose(evt)}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>
            <PlaceRounded />
            {props.name}
        </DialogTitle>
      </ModalDialog>
    </Modal>
  );
}

export default QuestionModal;