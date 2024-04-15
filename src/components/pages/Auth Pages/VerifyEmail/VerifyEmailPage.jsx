// VerifyEmailPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Button, Typography, Box, Alert, Grid,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import { verifyEmail } from '../../../../features/auth/authSlice';

function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve email from localStorage or Redux state if you prefer
  const email = localStorage.getItem('emailForVerification');

  async function handleSubmit() {
    if (!email || !verificationCode) {
      setErrorMsg("Missing email or verification code.");
      return;
    }
    setIsLoading(true);
    console.log(email);
    dispatch(verifyEmail({ email, verificationCode }))
      .unwrap()
      .then(() => {
        navigate('/login'); // Redirect to login on successful verification
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setErrorMsg(error);
        setIsLoading(false);
      });
  }

  return (
    <Box className="verificationSection">
      <Card className="verificationCard" variant="outlined">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
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
              placeholder = {t("enterVerificationCode")}
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
              sx={{ mt: 2 }}
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
