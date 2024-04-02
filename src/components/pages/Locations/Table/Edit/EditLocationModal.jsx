import React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { Sheet, Grid, Button, DialogTitle, Divider, DialogContent } from "@mui/joy";
import { useLocations } from "../../Context/LocationContext";
import GridItem from "./GridItem";
import { DeleteForeverOutlined, PlaceRounded } from "@mui/icons-material";


function EditLocationModal(props) {
  const { locations } = useLocations();
  const selectedLocation = locations[props.index];
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog layout="center" width="60%">
        <ModalClose variant="plain" />
        <DialogTitle id="modal-title">
          <PlaceRounded />
          {selectedLocation?.name}
        </DialogTitle>
        <Divider />
        <DialogContent sx = {{
          width: '80dvw',
        }}>
          <Sheet display="flex" sx={{ flexFlow: "column" }}>
            <Grid container spacing={2} sx={{ overflow: "auto" , margin: 3}}>
              <GridItem label="Question" value={selectedLocation.question} fieldToUpdate = "question" id = {props.id}/>
              <GridItem label="Answer" value={selectedLocation.answer} fieldToUpdate = "answer" id = {props.id}/>
              <Button
                variant="solid"
                color="danger"
                endDecorator={<DeleteForeverOutlined />}
                sx = {{
                  width: "100%",
                  mt: 2,
                }}
              >
                Delete
              </Button>
            </Grid>
          </Sheet>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
export default EditLocationModal;
