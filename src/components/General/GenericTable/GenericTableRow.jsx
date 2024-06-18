import React from "react";
import { Box, IconButton } from "@mui/joy";
import { CheckCircleOutline, CheckCircle } from "@mui/icons-material";

function GenericTableRow({ row, columns, onSelect }) {
  const handleToggle = () => {
    onSelect(row._id);
  };

  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index} onClick={handleToggle}>{row[column.field]}</td>
      ))}
    </tr>
  );
}

export default GenericTableRow;
