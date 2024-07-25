import { InfoOutlined, Star } from "@mui/icons-material";
import { Box, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import { Children, useState } from "react";

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
  endDecorator,
  helpMessage,
  color = "neutral",
  children,
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
    <FormControl component={type}>
      <FormLabel>
        {label} {required && <Star sx={{ fontSize: 12, ml: 0.5 }} />}
      </FormLabel>
      <Input
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        error={hasError}
        color={color}
        type={type}
        variant={variant}
        onChange={handleChange}
        placeholder={placeholder || label}
        value={value}
        required={required}
        disabled={disabled}
      />
      {children && <Box mt={0.5}>{children}</Box>}
      {helpMessage && hasError && (
        <FormHelperText>
          <InfoOutlined /> {helpMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
