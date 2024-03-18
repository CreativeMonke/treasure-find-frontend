import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import Input from "@mui/joy/Input";
import "./Css/PoiComponents.css";
import { Button, Stack } from "@mui/joy";
function TimelineCard(props) {
  return (
    <Card className="cardDesk" key={props.index}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={props.pic} loading="lazy" alt={props.name} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h4">{props.name}</Typography>
        <Typography level="body2">{props.question}</Typography>
      </CardContent>
      <CardContent>
        <form>
          <Stack spacing={1}>
            <Input placeholder="Answer Here" variant="soft" required />
            <Button type="submit">Save Answer</Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
///This <Typography level="body2">{props.desc}</Typography> needs to be an input field!

export default TimelineCard;
