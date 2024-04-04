import {
  Card,
  Input,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext.js";
import "./LoginPage.css";
import InputField from "../../components/InputField.jsx";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  async function CreatePost() {
    setIsLoading(true);
    try {
      const res = await axios.post(
        apiUrl + "auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include this line in your request
        }
      );

      const status = res.data.status;
      setIsLoading(false);
      if (status === "succes") {
        // Successful login, redirect to home page
        login();

        navigate("/");
      } else {
        setErrorMsg(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.data);
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error.undefined ||
          "An error occurred during login."
      );
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    CreatePost();
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
              sx={{textAlign: "center" }}
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
