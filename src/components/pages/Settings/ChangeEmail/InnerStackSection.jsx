import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, Stack, Typography } from "@mui/joy";
import BetterInputField from "../../components/BetterInputField";
import { useTranslation } from "react-i18next";
import {
  sendVerificationEmail,
  verifyCode,
} from "../../../../features/general/generalSlice";
import { updateUserAttributes } from "../../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function ChangeEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentEmail = useSelector((state) => state.auth.user.email);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email input, 2: Verification code input
  const [errorMsg, setErrorMsg] = useState(null);

  const handleEmailChange = (value) => {
    setNewEmail(value);
  };

  const handleVerificationCodeChange = (value) => {
    setVerificationCode(value);
  };

  const handleSendVerificationEmail = async () => {
    setLoading(true);

    try {
      if (!emailRegex.test(newEmail)) {
        throw new Error("Invalid email format");
      }

      const { payload: res } = await dispatch(
        sendVerificationEmail({
          email: newEmail,
          change: newEmail,
          type: "emailChange",
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

  const handleVerifyCodeAndChangeEmail = async () => {
    setLoading(true);

    try {
      const { payload: res } = await dispatch(
        verifyCode({
          verificationCode: verificationCode,
          change: newEmail,
          type: "emailChange",
        })
      );

      if (res.tempChange?._id) {
        await dispatch(updateUserAttributes({ email: newEmail }));
        setErrorMsg("");
      } else {
        throw new Error(
          res.message || "Failed to verify code and change email"
        );
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
        <BetterInputField
          label={t("currentEmail")}
          disabled
          value={currentEmail}
        />
        <BetterInputField
          label={t("newEmail")}
          placeholder={t("newEmailPlaceholderMessage")}
          value={newEmail}
          type="email"
          required
          disabled={step === 2}
          color={step === 2 && "success"}
          setValue={handleEmailChange}
          helpMessage={t("emptyErrorMessage")}
          endDecorator={
            <Button
              size="md"
              onClick={handleSendVerificationEmail}
              disabled={!newEmail}
              loading={loading}
              color={step === 1 ? "warning" : step === 2 ? "success" : "danger"}
            >
              {step === 1
                ? t("sendVerificationEmail")
                : t("sentVerificationEmail")}
            </Button>
          }
        />
        <BetterInputField
          label={t("verificationCode")}
          placeholder={t("verificationCodePlaceholder")}
          value={verificationCode}
          disabled={step !== 2}
          type="number"
          required
          setValue={handleVerificationCodeChange}
          helpMessage={t("emptyErrorMessage")}
        />
        <Button
          color="neutral"
          size="lg"
          onClick={handleVerifyCodeAndChangeEmail}
          loading={loading}
        >
          {t("verifyAndChangeEmail")}
        </Button>
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
              navigate("/settings/account");
            }}
          >
            {t("back")}
          </Button>
          <Button
            color="neutral"
            size="lg"
            onClick={() => {
              setStep(1);
              setErrorMsg("");
            }}
          >
            {t("cancel")}
          </Button>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
