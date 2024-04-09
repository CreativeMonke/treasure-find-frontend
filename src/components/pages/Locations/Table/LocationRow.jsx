import React, { useState } from "react";
import EditLocationModal from "./Edit/EditLocationModal.jsx";
import DeleteLocationModal from "./Delete/DeleteLocationModal.jsx";
import { Box, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import {  EditNoteRounded } from "@mui/icons-material";
function LocationRow({location , index}) {
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
        index={index}
        location = {location}
      />
      <DeleteLocationModal 
      open = {isDeleteOpen}
      setOpen={setIsDeleteOpen}
      index = {index}
      location = {location}
      />
      <tr>
        <td>{index + 1}</td>
        <td>{location.name}</td>
        <td>{location.question}</td>
        <td>{location.answer}</td>
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
