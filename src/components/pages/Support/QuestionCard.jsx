import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack, Divider } from '@mui/joy';
import { useTheme } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function QuestionCard({ question, content }) {
  const [flipped, setFlipped] = React.useState(false);
  const theme = useTheme();

  // Determine gradient and text colors based on the theme mode
  const isDarkMode = theme.palette.mode === 'dark';
  const gradient = isDarkMode
    ? "linear-gradient(0deg, var(--joy-palette-neutral-700) 0%, var(--joy-palette-neutral-800) 100%)"
    : "linear-gradient(0deg, var(--joy-palette-neutral-100) 0%, var(--joy-palette-neutral-200) 100%)";
  const textColor = isDarkMode ? "var(--joy-palette-neutral-100)" : "var(--joy-palette-neutral-700)";
  const subTextColor = isDarkMode ? "var(--joy-palette-neutral-300)" : "var(--joy-palette-neutral-600)";

  return (
    <Box
      sx={{
        perspective: "1500px",
        minHeight: "500px",
        maxHeight: "600px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        borderRadius: "10px",
        boxShadow: flipped
          ? "5px 10px 20px var"
          : "2px 5px 10px var(--joy-palette-neutral-700, #32383E)",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <Card
        variant="plain"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
          background: gradient,
        }}
      >
        {/* Front of the Card */}
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
            position: "absolute",
          }}
        >
          <Typography
            level="h2"
            textColor={textColor}
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {question}
          </Typography>
        </CardContent>

        {/* Back of the Card */}
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            overflow: "auto"
          }}
        >
          <Stack
            spacing={2}
            sx={{
              height: "100%",
              pl: 5,
              pr : 5,
              mt: 5,
            }}
          >
            <Typography level="h3" textColor={textColor}>
              {question}
            </Typography>
            <Divider />
            {content.map((row, index) =>
              row.isHeader ? (
                <Typography
                  level="title-md"
                  key={index}
                  textColor={textColor}
                >
                  {row.text}
                </Typography>
              ) : (
                <Typography
                  level="body-sm"
                  textColor={subTextColor}
                  startDecorator={<ArrowRightIcon />}
                >
                  {row.text}
                </Typography>
              )
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
