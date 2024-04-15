// VerifyEmailPage.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Typography, Box, Alert, Grid, useTheme } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import { verifyEmail } from "../../../../features/auth/authSlice";
import "./VerifyEmailPage.css";
function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // This hook provides the theme context
  const isDarkMode = theme.palette.mode === "dark"; // Check if the theme mode is 'dark'
  // Retrieve email from localStorage or Redux state if you prefer
  const email = localStorage.getItem("emailForVerification");
  const backgroundImageUrl = isDarkMode
    ? "./icons/backgroundDark.jpg"
    : "./icons/backgroundLight.jpg";
  useEffect(() => {
    if (!location.state?.fromRegistration) {
        return navigate("/register"); // or any other appropriate route
      }
  },[location , navigate]);
  async function handleSubmit() {
    if (!email || !verificationCode) {
      setErrorMsg("Missing email or verification code.");
      return;
    }
    setIsLoading(true);
    dispatch(verifyEmail({ email, verificationCode }))
      .unwrap()
      .then(() => {
        navigate("/login"); // Redirect to login on successful verification
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setErrorMsg(error);
        setIsLoading(false);
      });
  }

  return (
    <Box
      className="verificationSection"
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card className="verificationCard" variant="outlined">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              {t("verifyYourEmail")}
            </Typography>
          </Grid>
          {errorMsg && (
            <Grid item xs={12}>
              <Alert severity="error" color="danger">
                {errorMsg}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <InputField
              label={t("verificationCode")}
              placeholder={t("enterVerificationCode")}
              id="verification-code"
              setValue={setVerificationCode}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              variant="solid"
              color="primary"
            >
              {t("verify")}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default VerifyEmailPage;
