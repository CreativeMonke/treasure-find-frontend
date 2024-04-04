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
import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import InputField from "../../components/InputField";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function RegisterPage(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [town, setTown] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}auth/register`, {
        first_name: firstName,
        last_name: lastName,
        town,
        email,
        password,
      });

      if (response.data.status === "success") {
        ///Sets a delay of 0.2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        // Redirect or show a success message
        // Redirect to login page or home page as per your flow
      } else {
        console.log(response);
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error.response.data);
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error.undefined ||
          "An error occurred during registration."
      );
    }
    setIsLoading(false);
  }

  return (
    <Box
      className="registerSection"
      sx={{
        backgroundImage: `url(${"./icons/background.jpg"})`,
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
              Register
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
              label="First Name"
              id="firstname"
              setValue={setFirstName}
              type="firstname"
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              label="Last Name"
              id="lastname"
              setValue={setLastName}
              type="lastname"
            />
          </Grid>
          <Grid item xs={6}>
            <InputField label="Town" id="town" setValue={setTown} type="town" />
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
              label="Password"
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
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default RegisterPage;
