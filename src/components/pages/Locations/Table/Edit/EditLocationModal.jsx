import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import {
  Sheet,
  Grid,
  Button,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLocations,
  updateLocation,
} from "../../../../../features/locations/locationSlice";
import MapModal from "../../../../Location/Modal/MapModal";
import GridItem from "../../../components/GridItem";
import {
  ArrowRightAlt,
  DeleteForeverOutlined,
  PlaceRounded,
  SaveAltRounded,
  SaveRounded,
  ShareLocationRounded,
} from "@mui/icons-material";

function EditLocationModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  console.log(locations);
  const selectedLocation = locations.find(
    (location) => location._id === props.id
  );

  const [locationFields, setLocationFields] = useState({
    name: selectedLocation.name,
    question: selectedLocation.question,
    answer: selectedLocation.answer,
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
    // Potentially add more fields as needed
  });
  const selectedLocationCoords = {
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
  };
  const handleFieldChange = (field) => (value) => {
    if (!value) setHasError(true);
    else setHasError(false);
    setLocationFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  function locationCoords({ lat, lng }) {
    setLocationFields((prevFields) => ({
      ...prevFields,
      lat: lat,
      lng: lng,
    }));
  }

  const handleSave = () => {
    setIsLoading(true);
    dispatch(
      updateLocation({
        id: props.id,
        ...locationFields,
      })
    )
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
      <ModalDialog
        layout="center"
        sx={{
          mt: 2,
          height: "70dvh",
          width: "70vw",
          maxWidth: "1000px",
          maxHeight: "800px",
        }}
      >
        <ModalClose variant="plain" />
        <DialogTitle
          id="modal-title"
          sx={{
            justifyContent: "center",
          }}
        >
          <Typography level="title-lg">Editing</Typography>
          <ArrowRightAlt />
          <Typography level="title-lg" color="warning">
            {selectedLocation.name}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Sheet>
            <Grid container spacing={2} sx={{ overflow: "auto", margin: 1 }}>
              <Grid item xs={6}>
                <GridItem
                  label="Question"
                  hasError = {hasError}
                  value={locationFields.question}
                  onChange={handleFieldChange("question")}
                />
              </Grid>
              <Grid item xs={6}>
                <GridItem
                  label="Answer"
                  hasError = {hasError}
                  value={locationFields.answer}
                  onChange={handleFieldChange("answer")}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: "35dvh",
                }}
              >
                <MapModal
                  selectedLocationCoords={{
                    lat: selectedLocationCoords.lat,
                    lng: selectedLocationCoords.lng,
                  }}
                  setClickedLocation={locationCoords}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  {Math.trunc(locationFields.lat * 10000) / 10000}
                  <ShareLocationRounded
                    sx={{
                      pl: 1,
                      pr: 1,
                    }}
                  />
                  {Math.trunc(locationFields.lng * 10000) / 10000}
                </Divider>
              </Grid>
            </Grid>
          </Sheet>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1} sx={{ mr: 1, ml: 1 }}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => props.setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                loading={isLoading}
                variant="solid"
                color="primary"
                endDecorator={<SaveRounded />}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default EditLocationModal;
