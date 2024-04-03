import { FormControl, FormLabel, Input } from "@mui/joy";

export default function InputField(props) {
    function handleChange(evt){
        props.setValue(evt.target.value);
    }
  return (
    <FormControl flex="3 1">
      <FormLabel>{props.label}</FormLabel>
      <Input
        onChange={(evt) => handleChange(evt)}
        placeholder={props.label}
      />
    </FormControl>
  );
}
