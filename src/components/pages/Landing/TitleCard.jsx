import {
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  AspectRatio,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
const logoPath = process.env.PUBLIC_URL + "/icons/logo/logo.png";

function TitleCard() {
  const { t } = useTranslation();
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
      <AspectRatio
        minHeight={120}
        sx={{ width: "200px" }}
        objectFit="contain"
        variant="plain"
      >
        <img src={logoPath} alt="Logo" style={{ height: "100%" }} />
      </AspectRatio>
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
          {t("appDescription")}{" "}
        </Typography>
        <Typography color="primary" level="h5"></Typography>
        <Divider />
        <Typography color="primary" level="title-lg">
          {t("appName")}{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TitleCard;
