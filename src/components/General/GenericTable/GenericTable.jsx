import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import GenericTableRow from "./GenericTableRow";
import { Divider, Typography } from "@mui/joy";

function GenericTable({ title, columns, rows, onSelect }) {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Typography level="h2">{title}</Typography>
      <Divider />
      <Table borderAxis="xBetween" size="md" noWrap stickyFooter={false} hoverRow>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width || "auto" }}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <GenericTableRow key={row._id} row={row} columns={columns} onSelect={onSelect} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default GenericTable;
