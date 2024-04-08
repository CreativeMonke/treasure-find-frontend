import React from "react";
import { EditNoteRounded } from "@mui/icons-material";
import { Box, IconButton, Option, Select } from "@mui/joy";
import { Fragment, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Row({
  id,
  index,
  firstName,
  lastName,
  email,
  role: initialRole,
  token,
}) {
  const [role, setRole] = useState(initialRole);

  async function updateUserRole(newRole) {
    try {
      const response = await axios.put(
        `${apiUrl}users/edit/${id}`,
        { role: newRole },
        {
          headers: {
            sessionid: token,
          },
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        // Update local state only after successful API call
        setRole(newRole);
        console.log("Role update successful", response);
      }
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  }

  function handleChange(evt ,newValue) {
    console.log(newValue)
    const newRole = newValue;
    updateUserRole(newRole).then(()=>{
      
    });
  }
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>
        <Select value={role} onChange={handleChange} size="sm" variant="plain">
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
          <IconButton color="primary" variant="plain" size="md">
            <EditNoteRounded />
          </IconButton>
          <IconButton color="danger" variant="plain" size="sm">
            <DeleteIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}

export default Row;
