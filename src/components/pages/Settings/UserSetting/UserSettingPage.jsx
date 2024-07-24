import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import {
  Alert,
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/joy";
import BetterInputField from "../../components/BetterInputField";
import {
  Person,
  Email,
  EditRounded,
  OpenInNewRounded,
  MailRounded,
  KeyRounded,
  CancelRounded,
  PublishedWithChangesRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CityPicker from "../../../General/CityPicker";
import { updateUserAttributes } from "../../../../features/auth/authSlice";
function UserSettingPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    town: user.town,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (field) => (value) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const getInitials = () => {
    const firstNameInitial = userInfo.first_name.charAt(0).toUpperCase();
    const lastNameInitial = userInfo.last_name.charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  };

  async function handleSaveClick() {
    setLoading(true);
    setErrorMsg("");
    try {
      const { payload: res } = await dispatch(updateUserAttributes(userInfo));
      if (res.status === "success") {
        navigate("/settings/account");
      } else {
        throw new Error(res.message || "Failed to update user attributes");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography level="h1" sx={{ mb: 2 }}>
          {t("settings")}
        </Typography>
        <Card>
          <Box>
            <Typography level="title-lg">{t("personalInfo")}</Typography>
            <Typography level="body-sm">
              {t("personalInfoDescription")}{" "}
            </Typography>
          </Box>
          <Divider />
          <CardContent>
            <Grid container spacing={2} rowSpacing={3}>
              {errorMsg && (
                <Grid item xs={12}>
                  <Alert severity="error" color="danger">
                    {errorMsg}
                  </Alert>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 5,
                }}
              >
                <AspectRatio
                  ratio="1/1"
                  variant="soft"
                  color="primary"
                  sx={{
                    borderRadius: "50%",
                    width: "20%",
                    minWidth: "200px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography level="h1">{getInitials()}</Typography>
                </AspectRatio>
              </Grid>

              <Grid item xs={12} md={6}>
                <BetterInputField
                  label={t("firstName")}
                  placeholder={t("firstName")}
                  value={userInfo.first_name}
                  setValue={handleChange("first_name")}
                  required
                  startDecorator={<Person />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BetterInputField
                  label={t("lastName")}
                  placeholder={t("lastName")}
                  value={userInfo.last_name}
                  setValue={handleChange("last_name")}
                  required
                  startDecorator={<Person />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BetterInputField
                  label={t("emailPlaceholder")}
                  placeholder={t("emailPlaceholder")}
                  value={userInfo.email}
                  setValue={handleChange("email")}
                  disabled
                  type="email"
                  startDecorator={<Email />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ mb: 5 }}>
                <CityPicker
                  label={t("town")}
                  onChange={handleChange("town")}
                  value={userInfo.town}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  size="lg"
                  endDecorator={<CancelRounded />}
                  variant="outlined"
                  color="neutral"
                  loading={loading}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  size="lg"
                  loading={loading}
                  endDecorator={<PublishedWithChangesRounded />}
                  onClick={handleSaveClick}
                >
                  {t("save")}
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="plain"
                  size="sm"
                  color="warning"
                  type="submit"
                  endDecorator={<OpenInNewRounded />}
                  startDecorator={<MailRounded />}
                  onClick={() => {
                    navigate("/settings/changeEmail");
                  }}
                >
                  {t("changeEmail")}
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="sm"
                  variant="plain"
                  color="danger"
                  endDecorator={<OpenInNewRounded />}
                  startDecorator={<KeyRounded />}
                  onClick={() => {
                    navigate("/settings/changePassword");
                  }}
                >
                  {t("changePassword")}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </InnerPageSheet>
    </React.Fragment>
  );
}

export default UserSettingPage;
