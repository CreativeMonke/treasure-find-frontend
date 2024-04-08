import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import {
  Avatar,
  GlobalStyles,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Stack,
  Typography,
  listItemButtonClasses,
} from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure you have @mui/icons-material installed
import "./navbar.css";
import {
  Group,
  HomeRounded,
  KeyboardArrowDownOutlined,
  MapOutlined,
} from "@mui/icons-material";
import Header from "../pages/PageStructure/Header";
function NoNavbar() {
  let location = useLocation();
  const noNavbarPages = ["/login", "/register"];
  return !noNavbarPages.includes(location.pathname);
}

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(typeof window !== "undefined" && window.innerWidth < 900);
  const location = useLocation();
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


  function sidebarContents() {
    ///BorderSizing property for scrolling!!!
    return (
      <Sheet
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
          <Typography level="title-lg">VaultVoyage</Typography>
        </Box>

        <Box
          className="NavigationLinks"
          sx={{
            [`& ${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
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
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>

            {/*<ListItemButton
              component={Link}
              to="/poi"
              selected={isCurrent("/poi")}
              onClick={toggleDrawer}
            >
              <HomeRounded />
              <ListItemContent>
                <Typography level="title-sm">View Locations</Typography>
              </ListItemContent>
          </ListItemButton>*/}

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <MapOutlined />
                    <ListItemContent>
                      <Typography level="title-sm">Locations</Typography>
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
                      View
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/locations/admin"
                      selected={isCurrent("/locations/admin")}
                      onClick={toggleDrawer}
                    >
                      Edit
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
            
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
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <Group />
                    <ListItemContent>
                      <Typography level="title-sm">Users</Typography>
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
                    <ListItemButton
                      component={Link}
                      to="/user"
                      selected={isCurrent("/user")}

                      onClick={toggleDrawer}
                    >
                      My profile
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                     component={Link}
                     to="/user/roles"
                     selected={isCurrent("/user/roles")}
                     onClick={toggleDrawer}
                    >Roles & permissions</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          </List>
        </Box>
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
