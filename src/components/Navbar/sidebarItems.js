import {
  HomeRounded,
  MapOutlined,
  QuestionAnswerRounded,
  Group,
  TourRounded,
  MapRounded,
  PlaceRounded,
  EditLocationAltRounded,
  AdminPanelSettingsRounded,
  LibraryBooksRounded,
  DashboardRounded,
  FlagRounded,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function getSidebarItems(t, isCurrent, completeHuntData) {
  if (!completeHuntData || !Object.keys(completeHuntData).length) completeHuntData = null;
  return [
    {
      type: "divider",
      title: `${t("currentHunt")}`,
      level: "title-md",
      icon: <FlagRounded />,
      color: "cyan",
      permissionLevel: "0x01",
    },
    {
      type: "link",
      title: `${t("home")}`,
      icon: <HomeRounded />,
      permissionLevel: "0x01",
      link: "/",
      isCurrent: isCurrent("/"),
      nested: false,
    },
    completeHuntData
      ? {
          type: "link",
          title: completeHuntData.huntName,
          icon: <MapRounded />,
          permissionLevel: "0x01",
          link: "/hunts/currentHuntDetails",
          isCurrent: isCurrent("/hunts/currentHuntDetails"),
          nested: false,
        }
      : null,
    completeHuntData
      ? {
          type: "link",
          title: `${t("locations")} `,
          icon: <PlaceRounded />,
          permissionLevel: "0x01",
          isCurrent: isCurrent("/poi"),
          link: "/poi",
          nested: false,
        }
      : null,
    {
      type: "divider",
      title: `${t("myDashboard")}`,
      level: "title-md",
      color: "cyan",
      mt: "10%",
      icon: <DashboardRounded />,
    },
    {
      type: "link",
      title: `${t("locations")} - ${t("edit")}`,
      icon: <EditLocationAltRounded />,
      permissionLevel: "0x01",
      link: "/locations/myLocations/edit",
      isCurrent: isCurrent("/locations/myLocations/edit"),
      nested: false,
    },
    {
      type: "link",
      title: `${t("hunts")}`,
      icon: <TourRounded />,
      permissionLevel: "0x01",
      link: "/hunts",
      isCurrent: isCurrent("/hunts"),
      nested: true,
      children: [
        {
          title: `${t("overview")}`,
          link: "/hunts",
          isCurrent: isCurrent("/hunts"),
        },
        {
          title: `${t("myHunts")}`,
          link: "/hunts/myHunts",
          isCurrent: isCurrent("/hunts/myHunts"),
        },
      ],
    },
    {
      type: "link",
      title: `${t("myAnswers")}`,
      icon: <QuestionAnswerRounded />,
      permissionLevel: "0x01",
      link: "/answers/myAnswers",
      isCurrent: isCurrent("/answers/myAnswers"),
      nested: false,
    },
    {
      type: "divider",
      title: `${t("adminPanel")} `,
      level: "title-md",
      color: "purple",
      icon: <AdminPanelSettingsRounded />,
      mt: "15%",
      permissionLevel: "0x88",
    },
    {
      type: "link",
      title: `${t("users")}`,
      icon: <Group />,
      permissionLevel: "0x88",
      nested: true,
      children: [
        {
          title: `${t("answers")}`,
          link: "/answers/adminView",
          isCurrent: isCurrent("/answers/adminView"),
        },
        {
          title: `${t("rolesPermissions")}`,
          link: "/user/roles",
          isCurrent: isCurrent("/user/roles"),
        },
      ],
    },
  ].filter(Boolean);
}
