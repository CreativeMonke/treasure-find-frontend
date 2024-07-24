import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Box, Button, Stack, Typography } from "@mui/joy";
import BetterInputField from "../../components/BetterInputField";
import { useTranslation } from "react-i18next";
import {
  sendVerificationEmail,
  verifyCode,
  resetPassword,
} from "../../../../features/general/generalSlice";
import { KeyRounded, RepeatOneRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PasswordMeter from "../../../General/PasswordMeter/PasswordMeter";

export default function InnerStackSection() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email input, 2: Verification code input, 3: Password reset
  const [errorMsg, setErrorMsg] = useState(null);
  const minLength = 8;

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleVerificationCodeChange = (value) => {
    setVerificationCode(value);
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSendVerificationEmail = async () => {
    setLoading(true);
    try {
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const { payload: res } = await dispatch(
        sendVerificationEmail({
          email,
          change: email,
          type: "passwordReset",
        })
      );

      if (res.tempChange?._id) {
        setStep(2);
        setErrorMsg("");
      } else {
        throw new Error(res.message || "Failed to send verification email");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCodeAndProceed = async () => {
    setLoading(true);
    try {
      const { payload: res } = await dispatch(
        verifyCode({
          verificationCode,
          change: email,
          type: "passwordReset",
        })
      );

      if (res.tempChange?._id) {
        setStep(3);
        setErrorMsg("");
      } else {
        throw new Error(res.message || "Failed to verify code");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword.length < minLength) {
        setErrorMsg(t("passwordTooShort"));
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg(t("passwordsNotMatch"));
        return;
      }

      const { payload: res } = await dispatch(
        resetPassword({ email, newPassword })
      );
      if (res.user?._id) {
        setErrorMsg("");
        navigate("/login"); // Redirect to login page after successful password reset
      } else {
        throw new Error(res.message || "Failed to reset password");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Stack
        spacing={5}
        sx={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {errorMsg && (
          <Alert severity="error" color="danger">
            {errorMsg}
          </Alert>
        )}
        {step === 1 && (
          <BetterInputField
            label={t("emailPlaceholder")}
            placeholder={t("emailPlaceholderMessage")}
            value={email}
            type="email"
            required
            disabled={loading}
            setValue={handleEmailChange}
            helpMessage={t("emptyErrorMessage")}
          />
        )}
        {step === 2 && (
          <BetterInputField
            label={t("verificationCode")}
            placeholder={t("verificationCodePlaceholder")}
            value={verificationCode}
            type="number"
            required
            disabled={loading}
            setValue={handleVerificationCodeChange}
            helpMessage={t("emptyErrorMessage")}
          />
        )}
        {step === 3 && (
          <>
            <BetterInputField
              startDecorator={<KeyRounded />}
              label={t("newPassword")}
              required
              disabled={loading}
              type="password"
              value={newPassword}
              setValue={handleNewPasswordChange}
              helpMessage={t("emptyErrorMessage")}
            >
              <PasswordMeter value={newPassword} minLength={minLength * 2.5} />
            </BetterInputField>
            <BetterInputField
              startDecorator={<RepeatOneRounded />}
              label={t("confirmNewPassword")}
              required
              disabled={loading}
              type="password"
              value={confirmPassword}
              setValue={handleConfirmPasswordChange}
              helpMessage={t("emptyErrorMessage")}
            />
          </>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            color="neutral"
            variant="outlined"
            size="lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("back")}
          </Button>
          {step === 1 && (
            <Button
              size="md"
              onClick={handleSendVerificationEmail}
              disabled={!email}
              loading={loading}
              color="primary"
            >
              {t("sendVerificationEmail")}
            </Button>
          )}
          {step === 2 && (
            <Button
              color="primary"
              size="lg"
              onClick={handleVerifyCodeAndProceed}
              loading={loading}
            >
              {t("verify")}
            </Button>
          )}
          {step === 3 && (
            <Button
              color="primary"
              size="lg"
              onClick={handleResetPassword}
              loading={loading}
            >
              {t("resetPassword")}
            </Button>
          )}
        </Box>
      </Stack>
    </React.Fragment>
  );
}
