import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import BetterInputField from "../../components/BetterInputField";
import { useTranslation } from "react-i18next";
import {
  changePassword,
  sendVerificationEmail,
  verifyCode,
} from "../../../../features/general/generalSlice";
import { updateUserAttributes } from "../../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import PasswordMeter from "../../../General/PasswordMeter/PasswordMeter";
import { KeyRounded, RepeatOneRounded } from "@mui/icons-material";

export default function ChangeEmail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPasssword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const minLength = 8;

  async function handleChangePassword() {
    setLoading(true);
    try {
      if (newPassword.length < minLength) {
        setErrorMsg(t("passwordTooShort"));
        return;
      }
      if (newPassword !== confirmPasssword) {
        setErrorMsg(t("passwordsNotMatch"));
        return;
      }
      const { payload: res } = await dispatch(
        changePassword({ currentPassword, newPassword })
      );
      if (res.user?._id) {
        setErrorMsg("");
        return;
      } else throw new Error(res.message || "Failed to change password");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

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
          label={t("currentPassword")}
          required
          disabled={loading}
          type="password"
          value={currentPassword}
          setValue={setCurrentPassword}
          helpMessage={t("emptyErrorMessage")}
        />
        <BetterInputField
          startDecorator={<KeyRounded />}
          label={t("newPassword")}
          required
          disabled={loading}
          type="password"
          value={newPassword}
          setValue={setNewPassword}
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
          value={confirmPasssword}
          setValue={setConfirmPassword}
          helpMessage={t("emptyErrorMessage")}
        />

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
            color="primary"
            size="lg"
            loading={loading}
            onClick={handleChangePassword}
          >
            {t("save")}
          </Button>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
