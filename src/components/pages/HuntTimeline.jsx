import React from "react"
import { Box } from "@mui/joy"
import TimelineCard from "../Poi/TimelineCard";
import locations from "../locationsExamples";
import { VerticalTimeline,VerticalTimelineElement } from "react-vertical-timeline-component";
import TreasureIcon from "./Svg/TreasureIcon";
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '@mui/material/styles';
import "./Css/HuntTimeline.css"
function HuntTimeline (props){
    const theme = useTheme();
    const themeBackgroundColor = theme.palette.background.body;

    console.log(themeBackgroundColor);
    return (
        <Box className = "mainWindow" backgroundColor = "background.body">
            <VerticalTimeline
            display = "flex"
            lineColor="primary."
            >
                {locations.map((location,index) => (
                    console.log(location),
                    <VerticalTimelineElement 
                    contentStyle={{ backgroundColor: themeBackgroundColor }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    icon = {<TreasureIcon />}
                    date = {location.lat}>
                    <TimelineCard key={index}
                    pic={location.pic}
                    name={location.name}
                    question={location.question}/>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </Box>
    );
}
export default HuntTimeline;