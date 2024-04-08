import { Sheet } from "@mui/joy";
import React from "react";

export default function GlobalSettingsPage() {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "10px",
      }}
    ></Sheet>
  );
}
