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
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next"; // Import useTranslation
import cities from "../../../../data/romanianCities.json";
import { useDispatch } from "react-redux";
import { register } from "../../../../features/auth/authSlice";
function RegisterPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [town, setTown] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation(); // Initialize useTranslation hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme(); // This hook provides the theme context
  const isDarkMode = theme.palette.mode === "dark"; // Check if the theme mode is 'dark'
  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
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
        navigate("/verifyEmail"); // navigate to verification page on success
      })
      .catch((error) => {
        if (error === "redirect") navigate("/verifyEmail");
        else console.error("Registration error:", error);
        setErrorMsg(error || "An error occurred during registration.");
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
                {errorMsg}
              </Alert>
            </Grid>
          )}
          <Grid item xs={6}>
            <InputField
              label={t("firstName")}
              id="firstname"
              setValue={setFirstName}
              type="firstname"
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              label={t("lastName")}
              id="lastname"
              setValue={setLastName}
              type="lastname"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              placeholder={t("town")}
              onChange={(e) => setTown(e.target.textContent)}
              size="sm"
            >
              {cities.map((city) => (
                <Option key={city.abr} value={city.nume}>
                  {city.nume}
                </Option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Email"
              id="email"
              setValue={setEmail}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label={t("passwordPlaceholder")}
              id="password"
              setValue={setPassword}
              type="password"
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
