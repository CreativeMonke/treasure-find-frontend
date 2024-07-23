import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";
import { DownloadRounded, FileDownloadOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { getAllAnswersCsvByHuntId } from "../../../../../features/hunt/huntSlice";

function DownloadCSVButton({ huntId, huntName }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const csvLinkRef = useRef(null);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const result = await dispatch(getAllAnswersCsvByHuntId(huntId)).unwrap();
      console.log(result);
      if (result.status === "success") {
        setData(result.data);
        setTimeout(() => {
          csvLinkRef.current.link.click();
        }, 0);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    setData([]);
  }, []);

  return (
    <React.Fragment>
      <Button
        onClick={handleDownload}
        loading={loading}
        variant="outlined"
        loadingPosition="end"
        color="success"
        endDecorator={<FileDownloadOutlined />}
      >
        {loading ? t("loading") : `${t("download")} CSV`}
      </Button>
      <CSVLink
        data={data}
        filename={`${t("answers")} ${huntName}.csv`}
        className="hidden" // Ensure it's hidden
        style={{ display: "none" }} // Use inline style to hide
        ref={csvLinkRef}
        target="_blank"
      />
    </React.Fragment>
  );
}

export default DownloadCSVButton;
