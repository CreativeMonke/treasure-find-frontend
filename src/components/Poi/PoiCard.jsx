import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
function PoiCard(props) {
  return (
    <Card className="cardDesk" key={props.index} variant="soft">
      <CardOverflow>
        <AspectRatio ratio="2">
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
///This <Typography level="body2">{props.desc}</Typography> needs to be an input field!

export default PoiCard;
