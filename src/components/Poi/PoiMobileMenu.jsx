import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import locations from "../locationsExamples";
import PoiCardMob from "./PoiCardMobile";
import { Box } from "@mui/joy";

function PoiMobileMenu(props) {
  const MenuItem = ({ text, itemId }) => {
    const visibility = React.useContext(VisibilityContext);
    return (
      <Box
        className="menu-item"
        tabIndex={0}
        role="button"
        style={{
          display: "inline-block",
          backgroundColor: visibility.isItemVisible(itemId) ? "lightgrey" : "",
        }}
      >
        <PoiCardMob {...text} />
      </Box>
    );
  };

  const menuItems = locations.map((location, index) => (
    <MenuItem
      text={{ pic: location.pic, name: location.name, desc: location.desc }}
      itemId={`item-${index}`}
      key={index}
    />
  ));

  return <ScrollMenu>{menuItems}</ScrollMenu>;
}

export default PoiMobileMenu;
