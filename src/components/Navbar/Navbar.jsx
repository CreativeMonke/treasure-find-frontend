import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import { Divider, Drawer, IconButton, Sheet } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../pages/PageStructure/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import LanguageSwitcher from "./Language/LanguageSelect";
import { useTranslation } from "react-i18next";
import SidebarContents from "./SidebarContents";
import { getSidebarItems } from "./sidebarItems"; // Import the sidebarItems

function NavBar() {
  const { t } = useTranslation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" && window.innerWidth < 900
  );
  const userInfo = useSelector((state) => state.auth.user);
  const completeHuntData = useSelector(
    (state) => state.hunt.currentHuntInfo.completeHuntData
  );
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

  const sidebarItems = getSidebarItems(t, isCurrent, completeHuntData);

  const filteredSidebarItems = [];

  const itemsMap = new Map();

  sidebarItems.forEach((item) => {
    if (item.permissionLevel > userInfo.role) return;

    const key = `${item.title}-${item.link}`;

    if (
      !itemsMap.has(key) ||
      itemsMap.get(key).permissionLevel < item.permissionLevel
    ) {
      itemsMap.set(key, item);
    }
  });

  itemsMap.forEach((value) => filteredSidebarItems.push(value));

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
      <SidebarContents
        sidebarItems={sidebarItems}
        isCurrent={isCurrent}
        closeDrawer={closeDrawer}
        toggleDrawer={toggleDrawer}
      />
    </Drawer>
  );

  return (
    <React.Fragment>
      {isMobileView ? (
        <React.Fragment>
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
              sx = {{
                left : 5,
                position : "relative",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Header />
          </Sheet>
          {renderMobileMenu()}
        </React.Fragment>
      ) : (
        <SidebarContents
          sidebarItems={filteredSidebarItems}
          isCurrent={isCurrent}
          closeDrawer={closeDrawer}
          toggleDrawer={toggleDrawer}
        />
      )}
    </React.Fragment>
  );
}

export default NavBar;
