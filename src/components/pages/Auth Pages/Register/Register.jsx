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
import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function RegisterPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}auth/register`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (response.data.status === "success") {
        // Redirect or show a success message
        navigate("/login"); // Redirect to login page or home page as per your flow
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
  }

  return (
    <Box className="registerSection" 
    sx={{
      backgroundImage: `url(${"./icons/background.jpg"})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Card className="registerCard" variant="outlined">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Register
        </Typography>
        {errorMsg && (
          <Alert severity="error" color="danger" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              placeholder="First Name"
              variant="outlined"
              my={2}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              placeholder="Last Name"
              variant="outlined"
              my={2}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl>
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
          <FormControl>
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
          <Button type="submit" variant="solid" color="primary" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
export default RegisterPage;
