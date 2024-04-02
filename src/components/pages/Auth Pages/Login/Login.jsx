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
} from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext.js";
import "./LoginPage.css";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function LoginPage(props) {
  const [isLoading,setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  async function CreatePost() {
    setIsLoading(true);
    try {
      const res = await axios.post(apiUrl + "auth/login", {
        email,
        password,
      });

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
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Login
        </Typography>
        {errorMsg && (
          <Alert severity="error" color="danger" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl className="formControl">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              variant="outlined"
              my={2}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl  className="formControl">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              variant="outlined"
              my={2}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            loading = {isLoading}
            type="submit"
            variant="solid"
            color="primary"
            
            className="buttonSubmit"
          >
            Sign In
          </Button>
        </form>
        <Typography className="linkText">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
export default LoginPage;
