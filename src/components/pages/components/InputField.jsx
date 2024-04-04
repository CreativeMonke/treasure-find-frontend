import { FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState } from "react";

export default function InputField(props) {
  const [error,hasError] = useState(false);

    function handleChange(evt){
        props.setValue(evt.target.value);
        handleError(evt);
    }
    function handleError(evt){
      if(!evt.target.value)
      {
        hasError(true);
      }
      else
      hasError(false);
    }

  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <Input
        error = { error }
        type = {props.type || "text"}
        variant = {props.variant}
        onChange={(evt) => handleChange(evt)}
        placeholder={!error?(props.placeholder ? props.placeholder: props.label):`${props.label} field is required`}
        value = {props.value}
      />
    </FormControl>
  );
}
