import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";
import {
  Group,
  HomeRounded,
  KeyboardArrowDownOutlined,
  LogoutRounded,
  MapOutlined,
  QuestionAnswerRounded,
  SupportRounded,
} from "@mui/icons-material";
import Header from "../pages/PageStructure/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import RemainingTime from "../pages/components/RemainingTime";
import LanguageSwitcher from "./Language/LanguageSelect";
import { useTranslation } from "react-i18next"; // Import useTranslation

function Toggler({ defaultExpanded = false, children, renderToggle }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

function NavBar() {
  const { t } = useTranslation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" && window.innerWidth < 900
  );
  const userInfo = useSelector((state) => state.auth.user[0]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isCurrent = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(navigate("/login"))
      .catch((err) => {
        console.error("Failed to logout: ", err);
      });
  }

  function sidebarContents() {
    ///BorderSizing property for scrolling!!!
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
            <ListItemButton
              component={Link}
              to="/"
              selected={isCurrent("/")}
              onClick={toggleDrawer}
            >
              <HomeRounded />
              <ListItemContent>
                <Typography level="title-sm">{t("home")}</Typography>
              </ListItemContent>
            </ListItemButton>

            {userInfo.role >= "0x60" ? (
              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      <MapOutlined />
                      <ListItemContent>
                        <Typography level="title-sm">
                          {t("locations")}
                        </Typography>
                      </ListItemContent>
                      <KeyboardArrowDownOutlined
                        sx={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/poi"
                        selected={isCurrent("/poi")}
                        onClick={toggleDrawer}
                      >
                        {t("overview")}
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/locations/admin"
                        selected={isCurrent("/locations/admin")}
                        onClick={toggleDrawer}
                      >
                        {t("edit")}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Toggler>
              </ListItem>
            ) : (
              <ListItem>
                <ListItemButton
                  component={Link}
                  to="/poi"
                  selected={isCurrent("/poi")}
                  onClick={toggleDrawer}
                >
                  <MapOutlined />
                  {t("locations")}
                </ListItemButton>
              </ListItem>
            )}
            {
              <ListItem>
                <ListItemButton
                  component={Link}
                  to="/answers/myAnswers"
                  selected={isCurrent("/answers/myAnswers")}
                  onClick={toggleDrawer}
                >
                  <QuestionAnswerRounded />
                  {t("myAnswers")}
                </ListItemButton>
              </ListItem>
            }
            {/*<ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <MapOutlined />
                    <ListItemContent>
                      <Typography level="title-sm">Hunts</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownOutlined
                      sx={{ transform: open ? "rotate(180deg)" : "none" }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem>
                    <ListItemButton>Overview</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Active Hunts</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Compleated</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
                */}
            {userInfo.role >= "0x60" && (
              <>
                <ListItem nested>
                  <Toggler
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        <Group />
                        <ListItemContent>
                          <Typography level="title-sm">{t("users")}</Typography>
                        </ListItemContent>
                        <KeyboardArrowDownOutlined
                          sx={{ transform: open ? "rotate(180deg)" : "none" }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      <ListItem>
                        <ListItemButton
                          component={Link}
                          to="/user/overview"
                          selected={isCurrent("/user/overview")}
                          onClick={toggleDrawer}
                        >
                          {t("userOverview")}
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton
                          component={Link}
                          to="/answers/adminView"
                          selected={isCurrent("/answers/adminView")}
                          onClick={toggleDrawer}
                        >
                          {
                            //  <StickyNote2Rounded />
                          }
                          {t("answers")}
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton
                          component={Link}
                          to="/user/roles"
                          selected={isCurrent("/user/roles")}
                          onClick={toggleDrawer}
                        >
                          {t("rolesPermissions")}
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Toggler>
                </ListItem>
                {/*Answers*/}
              </>
            )}
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
              component={Link}
              to="/support"
              selected={isCurrent("/support")}
              onClick={toggleDrawer}
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

  const renderMobileMenu = () => (
    <Drawer
      className="SidebarDrawer"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      anchor="left"
      size="sm"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        borderColor: "divider",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
      }}
    >
      {sidebarContents()}
    </Drawer>
  );
  return (
    <>
      {isMobileView ? (
        <>
          <Sheet
            className="Header"
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              position: "fixed",
              top: 0,
              width: "100vw",
              height: "var(--Header-height)",
              zIndex: 9995,
              p: 1,
              gap: 1,
              borderBottom: "1px solid",
              borderColor: "background.level1",
              boxShadow: "sm",
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <MenuIcon />
            </IconButton>
            <Header />
          </Sheet>
          {renderMobileMenu()}
        </>
      ) : (
        sidebarContents()
      )}
    </>
  );
}

export default NavBar;
