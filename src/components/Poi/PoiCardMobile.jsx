// Simplifying React imports and grouping MUI components together
import React from "react";
import { Typography, Box, IconButton, Textarea, Card } from "@mui/joy";
import { ArrowForwardRounded } from "@mui/icons-material";
import MobileLayout from "./MobileLayout.tsx";

// Using destructuring in function parameters for clarity
const PoiCardMob = ({ pic, name, question, desc }) => (
  <MobileLayout  pic={pic} backgroundColor="background.body">
    <Card>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        {name}
      </Typography>
      <Typography fontSize="md" textColor="text.secondary" lineHeight="lg">
        {desc}
      </Typography>
      <Typography level = "h2" fontSize="1.3rem" lineHeight="lg">
        
        {question}
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent:"center",
          gap: 1,
          my: 2,
        }}
      >
        <Textarea className = "inputField"
          required
          minRows={2}
          size="md"
          placeholder="Your answer:"
          variant="soft"
          sx={{
            width: '80%'
          }}
        />
        <IconButton
          flex="2 1"
          type="submit"
          size="lg"
          variant="solid"
          color="primary"
        >
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Card>
  </MobileLayout>
);

export default PoiCardMob;
