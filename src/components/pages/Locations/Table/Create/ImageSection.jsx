import ImageIconRounded from "@mui/icons-material/Image";
import {
  AspectRatio,
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
} from "@mui/joy";
import React, { useState } from "react";
import InputField from "../../../components/InputField";
function ImageSection(props) {
  function handleChange(evt) {
    props.setValue(evt.target.value);
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxHeight: 500,
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          maxWidth: 720,
        }}
      >
        <InputField
          label="Image Source"
          setValue={props.setValue}
          placeholder="Enter img address"
        />
      </Grid>
      <Grid item xs={6} />
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AspectRatio
          flex
          sx={{
            maxWidth: 700,
          }}
        >
          {props.value ? (
            <img src={props.value} />
          ) : (
            <ImageIconRounded sx={{ opacity: 0.2 }} />
          )}
        </AspectRatio>
      </Grid>
    </Grid>
  );
}

export default ImageSection;
