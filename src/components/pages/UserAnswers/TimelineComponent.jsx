import { Sheet, Grid, Chip, Button } from "@mui/joy";
import AnswerCard from "./AnswerCard";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useTheme } from "@mui/material/styles";
import TreasureIcon from "../Svg/TreasureIcon";
import { useTranslation } from "react-i18next";
function TimelineCard({ location, answer, hasEnded }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const themeBackgroundColor = theme.palette.background.backdrop;
  const isCorrect = answer ? answer.evaluationScore >= 65 : false;
  return (
    <VerticalTimelineElement
      key={location._id}
      contentStyle={{
        backgroundColor:
          hasEnded && answer
            ? isCorrect
              ? "var(--joy-palette-success-800, #042F04)"
              : "var(--joy-palette-danger-800, #430A0A)"
            : themeBackgroundColor,
      }}
      contentArrowStyle={{
        borderRight: "7px solid  rgb(33, 150, 243)",
      }}
      icon={<TreasureIcon />}
      iconStyle={{
        background: "var(--joy-palette-primary-500, #0B6BCB)",
        color: "white",
      }}
    >
      <Grid container spacing={2} columnSpacing={6}>
        <Grid item xs={12}>
          <AspectRatio ratio="2">
            <img src={location.imgSrc} loading="lazy" alt={location.name} />
          </AspectRatio>
        </Grid>

        {hasEnded ? (
          <>
            <Grid item xs={12}>
              <AnswerCard location={location} answer={answer} />
            </Grid>
            {answer && (
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "center",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    xl={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Chip
                      size="lg"
                      color={isCorrect ? "success" : "danger"}
                      variant="solid"
                      sx={{
                        minWidth: "100%",
                        minHeight: "100%",
                        textAlign: "center",
                      }}
                    >
                      {isCorrect ? t("correctAnswer") : t("wrongAnswer")}
                    </Chip>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    xl={8}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="lg"
                      sx={{
                        width: "100%",
                      }}
                    >
                      {t("errorInEvaluation")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <Grid item xs={12}>
            <Typography level="title-md" color="warning">
              {t("moreInfoAfterEnd")}{" "}
            </Typography>
          </Grid>
        )}
      </Grid>
    </VerticalTimelineElement>
  );
}
export default TimelineCard;
