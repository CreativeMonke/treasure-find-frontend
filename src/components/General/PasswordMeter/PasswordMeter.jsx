import { LinearProgress, Stack, Typography } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";

function PasswordMeter({ value = "", minLength = 12 }) {
  const { t } = useTranslation();

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
          {value.length < 3 && t("veryWeak")}
          {value.length >= 3 && value.length < 6 && t("weak")}
          {value.length >= 6 && value.length < 10 && t("strong")}
          {value.length >= 10 && t("veryStrong")}
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

export default PasswordMeter;
