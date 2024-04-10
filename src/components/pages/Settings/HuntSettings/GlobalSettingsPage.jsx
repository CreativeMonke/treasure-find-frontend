import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, Typography, Grid, Button, Switch } from '@mui/joy';
import dayjs from 'dayjs';
import { editGlobalHuntInfo , toggleHasEnded} from '../../../../features/hunt/huntSlice'; // Ensure this import path matches your project structure
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function GlobalSettingsPage() {
  const dispatch = useDispatch();
  // Access your Redux state; ensure this selector matches your state shape
  const { startTime, endTime } = useSelector((state) => state.hunt.globalHuntInfo);
  let {hasEnded} = useSelector((state) => state.hunt);
  // Initialize state with Day.js objects, falling back to current time if not set
  const [start, setStart] = useState(startTime ? dayjs(startTime) : dayjs());
  const [end, setEnd] = useState(endTime ? dayjs(endTime) : dayjs());

  const handleSave = () => {
    // Dispatch action to save the updated times, converting Day.js objects to ISO strings
    dispatch(editGlobalHuntInfo({
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    }));
  };

  return (
    <Sheet variant="soft" sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '10px' }}>
      <Typography level="h1">Global Settings</Typography>
        <Grid container spacing={2}>
         <Grid item xs = {6} sx={{
          gap:1,
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
         }}>
          <Typography level="title-sm" >debug hasEnded:</Typography>
          <Typography level="body-sm" >Off</Typography>
          <Switch checked = {hasEnded===true} onChange={() => dispatch(toggleHasEnded())} />
          <Typography level="body-sm" >On</Typography>
         </Grid>
         {/* <Grid item xs={6}>
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={(newValue) => setStart(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          
          <Grid item xs={6}>
            <DateTimePicker
              label="End Time"
              value={end}
              onChange={(newValue) => setEnd(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          */
}
        </Grid>
      <Button onClick={handleSave} sx={{ mt: 2 }}>Save Changes</Button>
    </Sheet>
  );
}
