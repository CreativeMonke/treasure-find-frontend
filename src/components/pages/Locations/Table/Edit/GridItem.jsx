import React, { useState } from "react";
import { Typography, Textarea, Button, Grid } from "@mui/joy";

const GridItem = ({ label, value , databaseEntry}) => {
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
