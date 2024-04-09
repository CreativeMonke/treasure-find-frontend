import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { login } from "../../../../features/auth/authSlice.js";
import axios from "axios";
import { Card, Button, Typography, Box, Link, Alert, Grid } from "@mui/joy";
import "./LoginPage.css";
import InputField from "../../components/InputField.jsx";
import { fetchLocations } from "../../../../features/locations/locationSlice.js";
import { getAnswersByUserId } from "../../../../features/answers/answerSlice.js";
import { getGlobalHuntInfo } from "../../../../features/hunt/huntSlice.js";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";
  async function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(getGlobalHuntInfo()).then((action) => {
          if (action.error == null) {
            navigate("/");
            dispatch(fetchLocations());
            dispatch(getAnswersByUserId());
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
        backgroundImage: `url(${"./icons/background.jpg"})`,
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
              Login
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
              label="Email"
              type="email"
              placeholder="Email"
              setValue={setEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label="Password"
              type="password"
              placeholder="Password"
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
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className="linkText">
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register">
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default LoginPage;
