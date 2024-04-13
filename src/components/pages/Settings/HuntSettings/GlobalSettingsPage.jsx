import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, Typography, Grid, IconButton, Switch, Box } from "@mui/joy";
import {
  editGlobalHuntInfo,
  toggleHasEnded,
} from "../../../../features/hunt/huntSlice"; // Ensure this import path matches your project structure
import TimePick from "./TimePick";
import { BlockRounded, CheckCircleRounded } from "@mui/icons-material";

export default function GlobalSettingsPage() {
  const dispatch = useDispatch();
  // Access your Redux state; ensure this selector matches your state shape
  const { startTime, endTime } = useSelector(
    (state) => state.hunt.globalHuntInfo
  );
  let { hasEnded } = useSelector((state) => state.hunt);
  let { answersReady } = useSelector((state) => state.hunt.globalHuntInfo);
  const [start, setStart] = useState(
    startTime ? new Date(startTime) : new Date()
  );
  const [end, setEnd] = useState(endTime ? new Date(endTime) : new Date());
  useEffect(() => {
    if (startTime) {
      setStart(new Date(startTime));
    }
    if (endTime) {
      setEnd(new Date(endTime));
    }
  }, [startTime, endTime]);
  const handleSave = () => {
    dispatch(
      editGlobalHuntInfo({
        startTime: start,
        endTime: end,
      })
    );
  };
  function handleButtonClick() {
    dispatch(
      editGlobalHuntInfo({
        answersReady: !answersReady,
      })
    );
  }
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
    >
      <Typography level="h1">Global Settings</Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "row",
            borderRadius: "10px",
          }}
        >
          <Typography level="title-sm">debug hasEnded:</Typography>
          <Typography level="body-sm">Off</Typography>
          <Switch
            checked={hasEnded === true}
            onChange={() => dispatch(toggleHasEnded())}
          />
          <Typography level="body-sm">On</Typography>
        </Grid>
        <Grid item xs={12}>
          <TimePick
            onSave={handleSave}
            setStart={setStart}
            setEnd={setEnd}
            start={start}
            end={end}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              gridGap: "10px",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "border.divider",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography level="title-lg">Answers Ready:</Typography>
            <IconButton onClick={handleButtonClick}>
              {!answersReady ? <BlockRounded color = "danger"/> : <CheckCircleRounded color = "success"/>}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Sheet>
  );
}
