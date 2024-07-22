import { Sheet } from "@mui/joy";
import React from "react";

export default function InnerPageSheet({ children }) {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 2,
        opacity: 0.95,
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        height: "100%",
        overflow: "auto",
      }}
    >
      {children}
    </Sheet>
  );
}
