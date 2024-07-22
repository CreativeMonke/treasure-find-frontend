import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/joy";
import BetterInputField from "../../components/BetterInputField";
import { Person, Email } from "@mui/icons-material";

function UserSettingPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  });

  const handleChange = (field) => (value) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const getInitials = () => {
    const firstNameInitial = userInfo.firstName.charAt(0).toUpperCase();
    const lastNameInitial = userInfo.lastName.charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography level="h1">{t("settings")}</Typography>
        <Card>
          <Box>
            <Typography level="title-lg">{t("personalInfo")}</Typography>
            <Typography level="body-sm">TBD </Typography>
          </Box>
          <Divider />
          <CardContent>
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AspectRatio
                  ratio="1/1"
                  variant="soft"
                  color = "primary"
                  sx={{
                    borderRadius: "50%",
                    width: "20%",
                    minWidth: "200px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography level="h1">
                    {getInitials()}
                  </Typography>
                </AspectRatio>
              </Grid>
              <Grid item xs={6} md={4}>
                <BetterInputField
                  label={t("firstName")}
                  placeholder={t("firstName")}
                  value={userInfo.firstName}
                  setValue={handleChange("firstName")}
                  required
                  startDecorator={<Person />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <BetterInputField
                  label={t("lastName")}
                  placeholder={t("lastName")}
                  value={userInfo.lastName}
                  setValue={handleChange("lastName")}
                  required
                  startDecorator={<Person />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <BetterInputField
                  label={t("emailPlaceholder")}
                  placeholder={t("emailPlaceholder")}
                  value={userInfo.email}
                  setValue={handleChange("email")}
                  type="email"
                  disabled
                  startDecorator={<Email />}
                  helpMessage={t("emptyErrorMessage")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </InnerPageSheet>
    </React.Fragment>
  );
}

export default UserSettingPage;
