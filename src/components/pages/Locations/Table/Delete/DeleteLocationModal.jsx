// DeleteLocationModal.jsx
import React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import {
  Sheet,
  Button,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  Grid,
  DialogActions,
} from "@mui/joy";
import { useLocations } from "../../Context/LocationContext";
import {
  DeleteForeverOutlined,
  PlaceRounded,
  DetailsRounded,
} from "@mui/icons-material";

function DeleteLocationModal(props) {
  const { locations, deleteLocation } = useLocations();
  const selectedLocation = locations[props.index];

  const handleDelete = () => {
    deleteLocation(props.id); // Assuming this method exists in your context
    props.setOpen(false); // Close the modal after deletion
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog layout="center">
        <ModalClose variant="plain" />
        <DialogTitle id="modal-title">
          <DetailsRounded />
          Confirm Deletion of{" "}
          <Typography level="title-lg" color="warning">
            {selectedLocation.name}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ width: "40dvh", maxWidth: 800 }}>
          <Sheet>
            <Typography level="body-lg">
              This action cannot be undone!
            </Typography>
          </Sheet>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                size="lg"
                variant="solid"
                color="primary"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                size="lg"
                variant="solid"
                color="danger"
                endDecorator={<DeleteForeverOutlined />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default DeleteLocationModal;
