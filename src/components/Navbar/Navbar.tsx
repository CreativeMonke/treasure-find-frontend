import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import { Avatar, List, ListItem, ListItemButton, ListItemContent, Stack, Typography, listItemButtonClasses } from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure you have @mui/icons-material installed
import "./navbar.css";
import { Group, HomeRounded, KeyboardArrowDownOutlined, MapOutlined } from "@mui/icons-material";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
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
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 900);
  const location = useLocation();
  const isCurrent = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  function sidebarContents(){
    return(
    <Stack className = "Sidebar">
      <Box className = "SidebarHeader">
        <Typography level = "title-lg">VaultVoyage</Typography>
      </Box>
      
      <Box className = "NavigationLinks" 
      sx={{
        [`& ${listItemButtonClasses.root}`] : {
          gap: 1.5,
        },
      }}>
        <List className = "TopList"
        sx={{
          "--ListItem-radius" : (theme) => theme.vars.radius.sm,
        }}>
          <ListItemButton
          component = {Link}
          to = "/"
          selected = {isCurrent("/")}
          onClick={toggleDrawer}

          >
            <HomeRounded />
            <ListItemContent>
              <Typography level="title-sm">Home</Typography>
            </ListItemContent>
          </ListItemButton>

          <ListItemButton
           component = {Link}
           to = "/poi"
           selected = {isCurrent("/poi")}
           onClick={toggleDrawer}
           >
            <HomeRounded />
            <ListItemContent>
              <Typography level="title-sm">Locations</Typography>
            </ListItemContent>
          </ListItemButton>

          <ListItem nested>
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
              <List sx={{gap: 0.5}}>
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
          <ListItem nested>
            <Toggler
            renderToggle={({open,setOpen}) => (
              <ListItemButton onClick = {() => setOpen(!open)}>
                <Group />
                <ListItemContent>
                  <Typography level = "title-sm">
                    Users
                  </Typography>
                </ListItemContent>
                <KeyboardArrowDownOutlined sx = {{transform: open ? "rotate(180deg)":"none"}}/>
              </ListItemButton>
            )}
            >
              <List sx={{gap:0.5}}>
                <ListItem>
                  <ListItemButton>Overview</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  component = {Link}
                  to = "/user/edit"
                  onClick={toggleDrawer}>My profile</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permissions</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
      </Box>
      </Stack>
    )
  };

  const renderMobileMenu = () => (
    <Drawer
      className="SidebarDrawer"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      anchor="left"
      size="sm"
      sx={{
        borderColor:"divider",
      }}
    >
      {sidebarContents()}
    </Drawer>
  );
  return (
    <>
      {isMobileView ? (
        <Box className="mobileTopIcon" sx={{
          backgroundColor: "background.body",
        }} >
          <IconButton size="lg" onClick={toggleDrawer} sx={{ zIndex: 1 }}>
            <MenuIcon />
          </IconButton>
          
          {renderMobileMenu()}
        </Box>
      ) : (
      sidebarContents()
        )
    }
    </>
  )
};

export default NavBar;
