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
import InputField from "../components/InputField";
function ImageSection(props) {
  const [imgSrc, setImgSrc] = useState(null);
  function handleChange(evt) {
    setImgSrc(evt.target.value);
  }

  return (
    <Grid container spacing={2} sx={{
        maxHeight : 500,
    }}>
       <Grid item xs={6} md = {12} sx={{
        display: `flex`,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <InputField label="Image Source" setValue={setImgSrc} />
      </Grid>
      <Grid item xs={6} md = {12} sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      }} >
      <AspectRatio flex
      sx={{
        maxWidth:  700,
       
      }}
      >
        
        {imgSrc ? (
          <img src={imgSrc} />
        ) : (
          <ImageIconRounded sx={{ opacity: 0.2 }} />
        )}
      </AspectRatio>
      </Grid>
    </Grid>
  );
}

export default ImageSection;
