///A button to handle adding a new location to the database
import React, { useEffect, useState } from "react";
import { LocationContext } from "../../Context/LocationContext";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import { PlaceRounded } from "@mui/icons-material";
import ImageSection from "./ImageSection";
import SelectLocationSection from "./SelectLocationSection";
import InputField from "../../../components/InputField";
function CreateLocationModal(props) {
  const [newLocationProps, setNewLocationProps] = useState(null);
  const [name, setName] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [latLng, setLatlng] = useState(null);
  const [hasError, setHasError] = useState(true);
  useEffect(() => {
    if ((name, question, answer, imgSrc, latLng)) {
      setHasError(false);
      setNewLocationProps({
        name: name,
        question: question,
        answer: answer,
        imgSrc: imgSrc,
        latLng: latLng,
      });
    } else {
      setHasError(true);
    }
  }, [name, question, answer, imgSrc, latLng]);
  async function handleCreate(evt) {
    console.log(newLocationProps);
  }
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog layout="fullscreen">
        <ModalClose variant="plain" />
        <DialogTitle id="modalTitle">
          <PlaceRounded />
          Create a new location
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Sheet>
            <Grid container spacing={4} sx={{ overflow: "auto", margin: 3 }}>
              <Grid item xs={6} lg={2}>
                <InputField
                  label="Name"
                  id="name"
                  placeholder="Enter the desired value"
                  setValue={setName}
                />
              </Grid>
              <Grid item xs={8} lg={10} />
              <Grid item xs={6} lg={3}>
                <InputField
                  label="Question"
                  id="question"
                  placeholder="Enter the desired question"
                  setValue={setQuestion}
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <InputField
                  label="Correct answer"
                  id="answer"
                  placeholder="Enter the correct answer to the question"
                  setValue={setAnswer}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider>Image</Divider>
              </Grid>
              <Grid item xs={12}>
                <ImageSection setValue={setImgSrc} value={imgSrc} />
              </Grid>
              <Grid item xs={12}>
                <Divider>Location</Divider>
              </Grid>
              <Grid item xs={12}>
                <SelectLocationSection setValue={setLatlng} value={latLng} />
              </Grid>
            </Grid>
          </Sheet>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} disabled={hasError}>
            Create location
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
export default CreateLocationModal;
