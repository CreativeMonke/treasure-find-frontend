import React from "react";
import { EditNoteRounded } from "@mui/icons-material";
import { Box, IconButton, Option, Select } from "@mui/joy";
import { Fragment, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Row(props) {
  console.log(`${apiUrl}users/edit/${props.id}`);
  const [role, setRole] = useState(props.role);
  async function updateUserRole() {
    try {
      const response = await axios.put(
        `${apiUrl}users/edit/${props.id}`,
        {
          role,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
  ////Change is one behind actual value??
  function handleChange(evt , newValue) {
    console.log(evt);
    setRole(newValue);
    updateUserRole();
  }
  return (
    <Fragment>
      <tr>
        <td>{props.index + 1}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.email}</td>
        <td>
          <Select
            defaultValue={props.role}
            onChange={handleChange}
            size="sm"
            variant="plain"
          >
            <Option value="0x01">User</Option>
            <Option value="0x88">Admin</Option>
          </Select>
        </td>
        <td>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              variant="plain"
              size="md"
              onClick={(evt) => {
                //handleEditClick(evt);
              }}
            >
              <EditNoteRounded />
            </IconButton>
            <IconButton
              color="danger"
              variant="plain"
              size="sm"
              onClick={(evt) => {
                //handleDeleteClick(evt);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </td>
      </tr>
    </Fragment>
  );
}

export default Row;
