import React from "react";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

function MuiToSvgIcon({ name: MuiIconComponent, color }) {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      ${renderToStaticMarkup(<MuiIconComponent style={{ fill: 'var(--joy-palette-primary-200, #0B6BCB)'}} />)}
    </svg>
  `;
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgString
  )}`;

  return new L.Icon({
    iconUrl: svgUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default MuiToSvgIcon;
