import { Card, Input, Button, Typography, Box, Link, Alert } from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  async function CreatePost() {
    try {
      const res = await axios.post(apiUrl + "auth/login", {
        email,
        password,
      });
      const status = res.data.status;
      if (status === "succes") {
        // Successful login, redirect to home page
        navigate("/");
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    CreatePost();
  };

  return (
    <Box className="loginSection">
      <Card className="loginCard" variant="outlined">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            variant="outlined"
            placeholder="Email"
            fullWidth
            my={2}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Password"
            variant="outlined"
            fullWidth
            my={2}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="solid" color="primary" fullWidth>
            Sign In
          </Button>
          {errorMsg != null? (
            <Alert color="danger" size="sm" variant="solid" >
              {errorMsg}
            </Alert>
          ) : (
            <></>
          )}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </form>
      </Card>
    </Box>
  );
}
export default LoginPage;
