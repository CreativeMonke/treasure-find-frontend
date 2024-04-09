import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import { Grid } from "@mui/joy";
function AnswerCard({ location, answer }) {
  return (
    <Card variant="plain">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography level="h3">{location.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography level="body-md" color="primary">
              Intrebare
            </Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography level="body-md" color="warning">
              {location.question}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography level="body-md" color="primary">
              Raspuns corect
            </Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography level="body-md" color="success">
              {location.answer.split(";")[0]}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography level="body-md" color="primary">
              Raspunsul tau
            </Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography level="body-md" color="neutral">
              {answer
                ? answer.answer
                : "Niciun raspuns trimis pentru aceasta locatie!"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AnswerCard;
