import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import {
  KeyboardArrowDownOutlined,
  LogoutRounded,
  SupportRounded,
} from "@mui/icons-material";
import Toggler from "./Toggler";
import RemainingTime from "../pages/components/RemainingTime";
import LanguageSwitcher from "./Language/LanguageSelect";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./navbar.css";
function SidebarContents({
  sidebarItems,
  isCurrent,
  closeDrawer,
  toggleDrawer,
}) {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(navigate("/login"))
      .catch((err) => {
        console.error("Failed to logout: ", err);
      });
  }

  return (
    <Sheet
      invertedColors
      className="Sidebar"
      sx={{
        boxSizing: "border-box",
        top: 0,
        p: 2,
        gap: 2,
        height: "100dvh",
        width: "var(--Sidebar-width)",
      }}
    >
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeDrawer}
      />
      <Box className="SidebarHeader">
        <Typography level="title-lg">{t("appName")}</Typography>
        <LanguageSwitcher />
      </Box>

      <Box className="NavigationLinks">
        <List
          className="TopList"
          sx={{
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {sidebarItems.map((sidebarItem, index) => {
            const baseKey = `${sidebarItem.type}-${sidebarItem.title}-${index}`;

            return sidebarItem.type === "link" ? (
              sidebarItem.nested ? (
                <ListItem nested key={baseKey}>
                  <Toggler
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        {sidebarItem.icon}
                        <ListItemContent>
                          <Typography
                            level="title-md"
                            color={open && "warning"}
                          >
                            {sidebarItem.title}
                          </Typography>
                        </ListItemContent>
                        <KeyboardArrowDownOutlined
                          sx={{ transform: open ? "rotate(180deg)" : "none" }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      {sidebarItem.children.map((nestedItem, nestedIndex) => {
                        const nestedKey = `${sidebarItem.type}-${nestedItem.title}-${index}-${nestedIndex}`;
                        return (
                          <ListItem key={nestedKey}>
                            <ListItemButton
                              component={Link}
                              to={nestedItem.link}
                              selected={nestedItem.isCurrent}
                              onClick={toggleDrawer}
                            >
                              <Typography
                                color={nestedItem.isCurrent ? "primary" : ""}
                              >
                                {nestedItem.title}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Toggler>
                </ListItem>
              ) : (
                <ListItem key={baseKey}>
                  <ListItemButton
                    component={Link}
                    to={sidebarItem.link}
                    onClick={closeDrawer}
                  >
                    {sidebarItem.icon}
                    <ListItemContent>
                      <Typography
                        level="title-md"
                        color={sidebarItem.isCurrent ? "primary" : ""}
                      >
                        {sidebarItem.title}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              )
            ) : (
              sidebarItem.type === "divider" && (
                <Divider key={baseKey} sx = {{
                  mt:sidebarItem.mt,
                  mb:sidebarItem.mb
                }}>
                  <Typography
                    startDecorator={sidebarItem.icon}
                    color={sidebarItem.color}
                    level = {sidebarItem.level}
                  >
                    {sidebarItem.title}
                  </Typography>
                </Divider>
              )
            );
          })}
        </List>
      </Box>
      <List
        size="sm"
        sx={{
          mt: "auto",
          flexGrow: 0,
          gap: 0.7,

          "--ListItem-radius": (theme) => theme.vars.radius.sm,
        }}
      >
        {userInfo.role >= "0x60" && (
          <ListItem>
            <ListItemButton
              component={Link}
              to="/globalSettings"
              selected={isCurrent("/globalSettings")}
              onClick={toggleDrawer}
            >
              <SupportRounded />
              {t("settings")}
            </ListItemButton>
          </ListItem>
        )}
        <ListItem>
          <ListItemButton
            onClick={() =>
              (window.location.href = "https://docs-treasure-find.vercel.app")
            }
          >
            <SupportRounded />
            {t("support")}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider>
        <RemainingTime />
      </Divider>

      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={10}>
          <Box>
            <Typography level="title-sm">{userInfo.first_name}</Typography>

            <Typography level="body-xs">{userInfo.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={handleLogout}
          >
            <LogoutRounded />
          </IconButton>
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default SidebarContents;
