import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import "./Css/PoiCardMob.css"
function PoiCardMob( props ) {
  
  return (
    <Card className="cardMob" key={props.index}>
      <CardOverflow>
        <AspectRatio ratio="1.5">
          <img src={props.pic} loading="lazy" alt={props.name} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4">{props.name}</Typography>
        <Typography level="body2">{props.desc}</Typography>
      </CardContent>
    </Card>
  );
}

export default PoiCardMob;
