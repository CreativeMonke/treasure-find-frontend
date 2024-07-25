import {
  Card,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Grid,
  Select,
  Option,
  useTheme,
} from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import "./RegisterPage.css";
import BetterInputField from "../../components/BetterInputField";
import { useTranslation } from "react-i18next";
import cities from "../../../../data/romanianCities.json";
import { useDispatch } from "react-redux";
import { register } from "../../../../features/auth/authSlice";
import PasswordMeter from "../../../General/PasswordMeter/PasswordMeter";
import CityPicker from "../../../General/CityPicker";

function RegisterPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [town, setTown] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";

  const minPasswordLength = 8;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < minPasswordLength) {
      setErrorMsg(t("passwordTooShort"));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t("passwordsNotMatch"));
      return;
    }

    setIsLoading(true);
    dispatch(
      register({
        first_name: firstName,
        last_name: lastName,
        town,
        email,
        password,
      })
    )
      .unwrap()
      .then((response) => {
        navigate("/verifyEmail", { state: { fromRegistration: true } });
      })
      .catch((error) => {
        if (error === "redirect") {
          navigate("/verifyEmail", { state: { fromRegistration: true } });
        } else {
          console.error("Registration error:", error);
          setErrorMsg(
            error || error.message || "An error occurred during registration."
          );
        }
        setIsLoading(false);
      });
  }

  return (
    <Box
      className="registerSection"
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card className="registerCard" variant="outlined">
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 600,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              {t("register")}
            </Typography>
          </Grid>
          {errorMsg && (
            <Grid item xs={12}>
              <Alert severity="error" color="danger">
                {t(errorMsg)}
              </Alert>
            </Grid>
          )}
          <Grid item xs={6}>
            <BetterInputField
              label={t("firstName")}
              setValue={setFirstName}
              type="text"
              helpMessage={t("emptyErrorMessage")}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <BetterInputField
              label={t("lastName")}
              setValue={setLastName}
              type="text"
              helpMessage={t("emptyErrorMessage")}
              required
            />
          </Grid>
          <Grid item xs={8}>
            <BetterInputField
              label="Email"
              setValue={setEmail}
              type="email"
              helpMessage={t("emptyErrorMessage")}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <CityPicker label={t("town")} onChange={setTown} value={town} required/>
            {/*
            <Select
              placeholder={t("town")}
              onChange={(e) => setTown(e.target.textContent)}
              size="sm"
              required
            >
              {cities.map((city) => (
                <Option key={city.abr} value={city.nume}>
                  {city.nume}
                </Option>
              ))}
            </Select>
            */}
          </Grid>

          <Grid item xs={12}>
            <BetterInputField
              label={t("passwordPlaceholder")}
              setValue={setPassword}
              type="password"
              helpMessage={t("emptyErrorMessage")}
              required
            >
              <PasswordMeter
                value={password}
                minLength={minPasswordLength * 2.5}
              />
            </BetterInputField>
          </Grid>
          <Grid item xs={12}>
            <BetterInputField
              label={t("confirmPassword")}
              setValue={setConfirmPassword}
              type="password"
              helpMessage={t("emptyErrorMessage")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={(evt) => {
                handleSubmit(evt);
              }}
              loading={isLoading}
              variant="solid"
              color="primary"
              sx={{ mt: 2 }}
            >
              {t("register")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>
              {t("alreadyHaveAccount")}{" "}
              <Link component={RouterLink} to="/login">
                {t("login")}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default RegisterPage;
