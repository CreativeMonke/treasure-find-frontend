import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { login } from "../../../../features/auth/authSlice.js";
import { Card, Button, Typography, Box, Link, Alert, Grid, useTheme } from "@mui/joy";
import "./LoginPage.css";
import InputField from "../../components/InputField.jsx";
import { fetchLocations } from "../../../../features/locations/locationSlice.js";
import { getAnswersByUserId } from "../../../../features/answers/answerSlice.js";
import { getGlobalHuntInfo } from "../../../../features/hunt/huntSlice.js";
import { useTranslation } from "react-i18next";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const isLoading = status === "loading";
  const { t } = useTranslation();
  const theme = useTheme(); // This hook provides the theme context
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the theme mode is 'dark'
  const backgroundImageUrl = isDarkMode ? "./icons/backgroundDark.jpg" : "./icons/backgroundLight.jpg";

  async function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(getAnswersByUserId()).then((action) => {
          if (action.error == null) {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        console.error("Failed to login: ", err);
        const errorMessage =
          err?.response?.data?.message || "An error occurred durin login";
        setErrorMsg(errorMessage);
      });
  }

  return (
    <Box
      className="authSection"
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card className="authCard" variant="outlined">
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 400,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              {t("login")}
            </Typography>
          </Grid>
          {errorMsg && (
            <Grid item xs={12}>
              <Alert severity="error" color="danger">
                {t(errorMsg)}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <InputField
              label={t("emailPlaceholder")}
              type="email"
              placeholder={t("emailPlaceholder")}
              setValue={setEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label={t("passwordPlaceholder")}
              type="password"
              placeholder={t("passwordPlaceholder")}
              setValue={setPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              loading={isLoading}
              onClick={(evt) => handleSubmit(evt)}
              variant="solid"
              color="primary"
              className="buttonSubmit"
            >
              {t("signIn")}{" "}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className="linkText">
              {t("dontHaveAccount")} 
              <Link component={RouterLink} to="/register">
                {t("register")}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default LoginPage;
