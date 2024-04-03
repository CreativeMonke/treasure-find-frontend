///A button to handle adding a new location to the database
import React from "react";
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
function CreateLocationModal(props) {
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
              <Grid item xs={4}>
                <Typography level="title-md">Name</Typography>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter the desired name"
                />
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={6}>
                <Typography level="title-md">Question</Typography>
                <Input
                  id="question"
                  name="question"
                  placeholder="Enter the desired question"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography level="title-md">Correct answer</Typography>
                <Input
                  id="answer"
                  name="answer"
                  placeholder="Enter the correct answer to the question"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider>Image</Divider>
              </Grid>
              <Grid item xs={12}>
                <ImageSection />
              </Grid>
              <Grid item xs={12}>
                <SelectLocationSection />
              </Grid>
            </Grid>
          </Sheet>
        </DialogContent>
        <DialogActions>
          <Button>Create location</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
export default CreateLocationModal;
