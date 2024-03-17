import React , {useState} from "react";
import locations from "../locationsExamples";
import PoiCardMob from "./PoiCardMobile";
import "./Css/PoiComponents.css"
function PoiMobileMenu(props) {
  ///location[0] to props.startIndex
  const [cardData, updateCardData] = useState(locations[0]);
  console.log(cardData);
  function handleChange(props)
{
  cardData = updateCardData(props);
}
return (
  <PoiCardMob name = {cardData.name} pic = {cardData.pic} desc = {cardData.desc} />
);
}
export default PoiMobileMenu;
