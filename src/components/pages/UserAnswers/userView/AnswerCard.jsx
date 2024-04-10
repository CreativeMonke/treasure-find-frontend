import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import { Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
function AnswerCard({ location, answer }) {
  const { t } = useTranslation();
  return (
    <Card variant="plain">
      <CardContent>
        <Grid container spacing={{xs:0.1,md:2}}>
          <Grid item xs={12}>
            <Typography level="h3">{location.name}</Typography>
          </Grid>
          <Grid item xs={6} md = {3}>
            <Typography level="body-md" color="primary">
              {t("question")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md = {9}
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
          <Grid item xs={6} md = {3}>
            <Typography level="body-md" color="primary">
              {t("correctAnswer")}
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
          <Grid item xs={6} md = {3}>
            <Typography level="body-md" color="primary">
              {t("yourAnswer")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md = {9}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography level="body-md" color="neutral">
              {answer
                ? answer.answer
                : t("noAnswerProvided")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AnswerCard;
