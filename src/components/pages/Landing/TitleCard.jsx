import { Typography, Card, CardContent, Divider, Avatar } from "@mui/joy";
const logoPath = process.env.PUBLIC_URL + "/icons/logo/logo.png";

function TitleCard() {
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        variant="plain"
        src={logoPath}
        sx={{
          height: "4rem",
          width: "4rem",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography color="primary" level="h3">
          Vânătoare de comori culturală
        </Typography>
        <Typography color="primary" level="h5"></Typography>
        <Divider></Divider>
        <Typography color="primary" level="title-md">
          OniGim 2024
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TitleCard;
