import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TitleCard from "./TitleCard";
import WidgetCard from "./WidgetCard";
import { useDispatch, useSelector } from "react-redux";
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
import { PeopleRounded, PlaceRounded, TourRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./LandingPage.css";
import { getPreviewData } from "../../../features/general/generalSlice";

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isDarkMode = theme.palette.mode === "dark"; // Check if the theme mode is 'dark'
  const { nrOfLocations, nrOfHunts, nrOfSignedUpUsers } = useSelector(
    (state) => state.general.previewData
  );
  const loading = useSelector((state) => state.general.loading);
  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";

  useEffect(() => {
    dispatch(getPreviewData());
  }, [dispatch]);

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
                {t("eventPlatformDescription")}
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
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography level="body-lg">{t("areYouReady")}</Typography>
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
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
                <WidgetCard
                  isLoading={loading}
                  title={t("howManyHunts")}
                  value={nrOfHunts}
                  ofWhat={t("hunts").toLowerCase()}
                  icon = {<TourRounded />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <WidgetCard
                  isLoading={loading}
                  title={t("howManyLocations")}
                  value={nrOfLocations}
                  ofWhat={t("locations").toLowerCase()}
                  icon = {<PlaceRounded />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <WidgetCard
                  isLoading={loading}
                  title={t("howManyUsers")}
                  value={nrOfSignedUpUsers}
                  ofWhat={`${t("users").toLowerCase()}`}
                  icon={<PeopleRounded />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card size="lg">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography level="body-lg">{t("facingIssues")}</Typography>
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
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
            </Grid>
          </Box>
        </Stack>
      </Sheet>
    </React.Fragment>
  );
}

export default LandingPage;
