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
          }}
        >
          <DownloadCSV />
        </Box>
      </Box>
    </Sheet>
  );
}
export default AdminAnswersLandingPage;
