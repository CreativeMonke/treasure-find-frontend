import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import TitleCard from "./TitleCard";
import WidgetCard from "./WidgetCard";
import { useSelector } from "react-redux";
import {
  Sheet,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Box,
  useTheme,
} from "@mui/joy";
import RemainingTime from "../components/RemainingTime";
import { PeopleRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./LandingPage.css";
function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const huntInfo = useSelector((state) => state.hunt.globalHuntInfo);
  const { t } = useTranslation();
  const isDarkMode = theme.palette.mode === "dark"; // Check if the theme mode is 'dark'

  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";

  return (
    <React.Fragment>
      <Sheet
        component="main"
        className="MainContent"
        boxSizing="border-box"
        maxHeight="100vh"
        sx={{
          overflow: "auto",
          width: "100dvw",
          p: 2,
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Stack spacing={3}>
          <TitleCard />
          <Card size="lg">
            <CardContent>
              <Typography color="primary" level="body-lg">
                Îmbină distracția și cultura într-o vânătoare de indicii prin
                Iași! Observă, descoperă și răspunde provocărilor din cele mai
                emblematice locuri ale orașului. Ești gata să demonstrezi cât de
                atent poți fi?
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={3}>
                <Card size="lg">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "Row",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography level="body-lg">
                      Ești gata de distracție? Autentifică-te sau creează un
                      cont pentru a începe.
                    </Typography>
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "Row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="solid"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {t("login")}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate("/register");
                      }}
                      sx={{
                        minWidth: "max-content",
                      }}
                    >
                      {t("register")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <WidgetCard title="Timp ramas">
                  <RemainingTime />
                </WidgetCard>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <WidgetCard
                  title="Câte locații?"
                  status=""
                  value={huntInfo.nrOfObjectives}
                  ofWhat={t("locations").toLowerCase()}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <WidgetCard
                  title="Câti utilizatori?"
                  status=""
                  value={huntInfo.nrOfSignedUpUsers}
                  ofWhat={`nr de ${t("users").toLowerCase()} maxim`}
                  howMany={350}
                  icon={<PeopleRounded />}
                  isPercent
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card size="lg">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "Row",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography level="body-lg">
                      Întâmpini probleme sau ai întrebări? Suntem aici să te
                      ajutăm! Accesează pagina noastră de suport!
                    </Typography>
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "Row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() =>
                        (window.location.href =
                          "https://docs-treasure-find.vercel.app")
                      }
                      sx={{
                        minWidth: "max-content",
                      }}
                    >
                      {t("support")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              {/*  <Grid item xs={12}>
                <About />
              </Grid>
              */}
            </Grid>
          </Box>
        </Stack>
      </Sheet>
    </React.Fragment>
  );
}
export default LandingPage;
