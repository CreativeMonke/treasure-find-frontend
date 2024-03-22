import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import MobileLayout from "./MobileLayout.tsx";
import "./Css/PoiComponents.css";
function PoiCard(props) {
  return (
    <MobileLayout pic = {props.pic}>
      <Card className="cardDesk" key={props.index}>
        <CardOverflow>
        </CardOverflow>
        <CardContent>
          <Typography level="h4">{props.name}</Typography>
          <Typography level="body2">{props.desc}</Typography>
        </CardContent>
      </Card>
    </MobileLayout>
  );
}
///This <Typography level="body2">{props.desc}</Typography> needs to be an input field!

export default PoiCard;
