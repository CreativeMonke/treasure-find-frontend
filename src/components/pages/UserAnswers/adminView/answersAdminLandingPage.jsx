import React from "react";
import { Sheet, Typography, Box } from "@mui/joy";
import DownloadCSV from "./Csv/DownloadCsv";
import { useTranslation } from "react-i18next";

function AdminAnswersLandingPage() {
  const { t } = useTranslation();
  return (
    <Sheet
      variant="outlined"
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <Typography
        level="h1"
        sx={{
          top: 2,
        }}
      >
        {`${t("answers")} - ${t("overview")}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "border.divider",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <DownloadCSV />
        </Box>
      </Box>
    </Sheet>
  );
}
export default AdminAnswersLandingPage;
