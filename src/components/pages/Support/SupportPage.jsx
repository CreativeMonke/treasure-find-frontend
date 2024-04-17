import { Box, Grid, Sheet, Typography } from "@mui/joy";
import React from "react";
import QuestionCard from "./QuestionCard";
import supportQuestions from "./SupportQuestions.js";
function SupportPage(props) {
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <Grid
        container // Specify this Grid as a container
        spacing={6} // Provides space between items
        rowGap={6}
      >
        {supportQuestions.map((cardInfo, index) => (
          <Grid item lg={4} xs={12} sm={6} key={index}>
            <QuestionCard
              question={cardInfo.question}
              content={cardInfo.content}
              key={index}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 20, // Padding on the top and bottom
          textAlign: "center", // Center the text
        }}
      >
        <Typography level="title-lg" >
          Realizat de Darabana Rares Cristian
        </Typography>
      </Box>
    </Sheet>
  );
}

export default SupportPage;
