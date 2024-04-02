import React, { useState } from "react";
import { Typography, Textarea, Button, Grid } from "@mui/joy";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const GridItem = ({ label, value, fieldToUpdate, id }) => {
  const [newFieldText, setNewFieldTest] = useState(value);
  const [hasError, setHasError] = useState(false);
  const [wasModified, setWasModified] = useState(false);

  function handleFieldChange(evt) {
    const updatedValue = evt.target.value;
    if (!updatedValue) {
      setHasError(true);
      setWasModified(false);
    } else {
      setHasError(false);
      setWasModified(value !== updatedValue);
    }
    setNewFieldTest(updatedValue);
  }

  async function handleSave() {
    console.log(newFieldText);
    // Save the newLocationData to your database
    try {
      const res = await axios.put(`${apiUrl}locations/edit/${id}`, {
        [fieldToUpdate]: newFieldText,
      });
    } catch (err) {
      console.log(err);
    }
    setWasModified(false);
  }

  let placeholderText = value ? "" : "Enter a value";

  if (hasError) placeholderText = "Question field cannot be empty!";
  console.log(hasError);

  return (
    <Grid item xs={12}>
      <Typography level="h4" htmlFor={label.toLowerCase()}>
        {label}
      </Typography>
      <Textarea
        id={label.toLowerCase()}
        label={label}
        minRows={2}
        defaultValue={value}
        placeholder={placeholderText}
        onChange={handleFieldChange}
        error={hasError}
        sx={{ width: "100%" }}
        endDecorator={
          <Button
            disabled={!wasModified}
            onClick={handleSave}
            sx={{ ml: "auto", mr: "2px" }}
          >
            Save
          </Button>
        }
      />
    </Grid>
  );
};

export default GridItem;
