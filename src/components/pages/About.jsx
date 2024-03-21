import React from "react";
import Accordion from "@mui/joy/Accordion";
import AccordionSummary from "@mui/joy/AccordionSummary";
import AccordionDetails from "@mui/joy/AccordionDetails";
import Typography from "@mui/joy/Typography";
import { AccordionGroup, Button } from "@mui/joy";
import screenfull from "screenfull";
import Box from "@mui/joy/Box";
import "./Css/About.css"


function About() {
  function handleClick() {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }
  return (
    <Box className="mainContent" backgroundColor="background.body">
        <Typography
          level="h1"
          component="h1"
          mb={2}
          sx={{ textAlign: "center" }}
        >
          About Us
        </Typography>
        <AccordionGroup>
          <Accordion>
            <AccordionSummary level="h2" component="h2">
              Olimpiada Nationala de Informatica 2024 - Gimnaziu
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                The Olimpiada Nationala de Informatica 2024 for middle school
                students is set to take place in Iasi. This prestigious national
                competition aims to bring together the brightest young minds in
                computer science from across the country, offering them a
                platform to showcase their coding skills and innovative
                thinking.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary level="h2" component="h2">
              Purpose of the Application
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This application serves as a central hub for participants,
                educators, and enthusiasts of the Olimpiada Nationala de
                Informatica. It provides detailed information on event
                logistics, competition rules, and updates. Additionally, the app
                aims to foster a community of like-minded individuals passionate
                about computer science and innovation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary level="h2" component="h2">
              Treasure Finding Competition
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                As part of the Olimpiada, we're excited to introduce a treasure
                finding competition designed to challenge participants in a fun
                and interactive way. This competition will not only test their
                problem-solving skills but also encourage teamwork and
                creativity in navigating through various puzzles and challenges
                to find the hidden treasures within the app.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        <Button onClick={handleClick}>FullScreen</Button>
    </Box>
   
  );
}

export default About;
