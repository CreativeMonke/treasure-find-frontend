import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  fetchLocations,
} from "../../../../../features/locations/locationSlice";
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
import { DeleteForeverOutlined, DetailsRounded } from "@mui/icons-material";

function DeleteLocationModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const selectedLocation = locations.find((loc) => loc.id === props.id); // Assuming location ID is passed as prop

  const handleDelete = () => {
    setIsLoading(true);
    dispatch(deleteLocation(props.id))
      .unwrap()
      .then(() => {
        dispatch(fetchLocations()).unwrap();
        setIsLoading(false);
        props.setOpen(false);
      })
      .catch((err) => {
        console.error("Couldn't delete:", err);
        setIsLoading(false);
      });
  };
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog layout="center" sx={{ position: "absolute" }}>
        <ModalClose variant="plain" />
        <DialogTitle id="modal-title">
          <DetailsRounded />
          Confirm Deletion of{" "}
          <Typography level="title-lg" color="warning">
            {selectedLocation?.name}
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
                onClick={() => props.setOpen(false)}
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
                loading={isLoading}
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
