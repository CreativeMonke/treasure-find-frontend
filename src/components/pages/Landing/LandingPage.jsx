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
  CardOverflow,
  CardContent,
  AspectRatio,
  Stack,
  Divider,
  Avatar,
  Button,
  Box,
  CircularProgress,
} from "@mui/joy";
import About from "../About";
import RemainingTime from "../components/RemainingTime";
import { PeopleRounded } from "@mui/icons-material";
function LandingPage() {
  const navigate = useNavigate();
  const huntInfo = useSelector((state) => state.hunt.globalHuntInfo);
  return (
    <React.Fragment>
      <Sheet
        sx={{
          height: "100%",
          overflow: "auto",
          p: 2,
        }}
      >
        <Stack spacing={3}>
          <TitleCard />
          <Card size="lg">
            <CardContent>
              <Typography color="primary" level="body-lg">
                Îmbină distracția cu cultura într-o vânătoare de indicii prin
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
                    }}
                  >
                    <Typography level="body-lg">
                      Esti gata pentru distractie?
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
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card variant="outlined">
                  <CardContent>
                    <RemainingTime />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card variant="outlined">
                  <CardContent>
                    <CircularProgress
                      determinate
                      value={huntInfo.nrOfSignedUpUsers}
                    >
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <PeopleRounded />
                      </Avatar>
                    </CircularProgress>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <About />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Sheet>
    </React.Fragment>
  );
}
export default LandingPage;
