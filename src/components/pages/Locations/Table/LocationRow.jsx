import React, { useState } from "react";
import EditLocationModal from "./Edit/EditLocationModal.jsx";
import DeleteLocationModal from "./Delete/DeleteLocationModal.jsx";
import { Box, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import {  EditNoteRounded } from "@mui/icons-material";
function LocationRow(props) {
  console.log(props);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  function handleEditClick(evt) {
    setIsEditOpen(true);
  }
  function handleDeleteClick(evt) {
    setIsDeleteOpen(true);
  }
  return (
    <React.Fragment>
      <EditLocationModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        index={props.index}
        id={props.id}
      />
      <DeleteLocationModal 
      open = {isDeleteOpen}
      setOpen={setIsDeleteOpen}
      index = {props.index}
      id = {props.id}
      />
      <tr>
        <td>{props.index + 1}</td>
        <td>{props.name}</td>
        <td>{props.question}</td>
        <td>{props.answer}</td>
        <td>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton color="primary" variant="plain" size="md" onClick = {(evt) =>{
              handleEditClick(evt)
            }}>
              <EditNoteRounded />
            </IconButton>
            <IconButton color="danger" variant="plain" size="sm" onClick = {(evt) => {
              handleDeleteClick(evt)
            }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default LocationRow;
