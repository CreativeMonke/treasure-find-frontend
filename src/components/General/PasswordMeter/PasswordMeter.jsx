import { LinearProgress, Stack, Typography } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";

function PasswordMeter({ value = "", minLength = 12 }) {
  const { t } = useTranslation();

  const veryWeakThreshold = minLength * 0.25;
  const weakThreshold = minLength * 0.5;
  const strongThreshold = minLength * 0.75;

  const getStrengthLabel = () => {
    if (value.length < veryWeakThreshold) return t("veryWeak");
    if (value.length >= veryWeakThreshold && value.length < weakThreshold)
      return t("weak");
    if (value.length >= weakThreshold && value.length < strongThreshold)
      return t("strong");
    if (value.length >= strongThreshold) return t("veryStrong");
  };
  return (
    <React.Fragment>
      <Stack
        sx={{
          "--hue": Math.min(value.length * 10, 120),
        }}
      >
        <LinearProgress
          determinate
          size="sm"
          value={Math.min((value.length * 100) / minLength, 100)}
          sx={{
            bgcolor: "background.level3",
            color: "hsl(var(--hue) 80% 40%)",
          }}
        />
        <Typography
          level="body-xs"
          sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
        >
          {getStrengthLabel()}
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

export default PasswordMeter;
