import { InfoOutlined, Star } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import { useState } from "react";

export default function BetterInputField({
  setValue,
  type = "text",
  variant,
  disabled,
  value,
  placeholder,
  onChange,
  required = false,
  label,
  startDecorator,
  helpMessage,
}) {
  const [hasError, setHasError] = useState(false);

  function handleChange(evt) {
    const newValue = evt.target.value;
    setValue(newValue);
    if (onChange) onChange(evt);
    handleError(newValue);
  }

  function handleError(newValue) {
    if (required && !newValue) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }

  return (
    <FormControl>
      <FormLabel>
        {label} {required && <Star sx={{ fontSize: 12, ml: 0.5 }} />}
      </FormLabel>
      <Input
        startDecorator={startDecorator}
        error={hasError}
        type={type}
        variant={variant}
        onChange={handleChange}
        placeholder={placeholder || label}
        value={value}
        disabled={disabled}
      />
      {helpMessage && hasError && (
        <FormHelperText>
          <InfoOutlined /> {helpMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
