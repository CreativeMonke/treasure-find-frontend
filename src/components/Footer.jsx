import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";
import "./App.css"
function Footer() {
  var year = new Date().getFullYear();
  var [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <Box className = "footer">
      <Typography>Copyright @DRC {year}</Typography>
      <Typography level="h5">{time}</Typography>
    </Box>
  );
}
export default Footer;
