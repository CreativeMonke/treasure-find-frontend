import HuntDetail from "../HuntDetail";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IconButton } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Sheet, Tooltip } from "@mui/joy";
import { OpenInNewRounded } from "@mui/icons-material";

function Row({
  row,
  isOpen,
  onExpandClick,
  handleJoin,
  handleEdit,
  handleDelete,
  handleExit,
  userActiveHuntId,
  color,
}) {
  const navigate = useNavigate();
  const handleHuntMoreInfoClick = (event) => {
    console.log(row);
    event.stopPropagation();
    navigate(`/hunts/details/${row._id}`, { state: { huntData: row } });
  };
  return (
    <React.Fragment>
      <tr
        onClick={() => onExpandClick(row._id)}
        style={{
          backgroundColor:
            color === "success"
              ? "var(--joy-palette-success-softBg)"
              : color === "primary"
              ? "var(--joy-palette-primary-softBg)"
              : "var(--joy-palette-neutral-softBg)",
        }}
      >
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{row.huntName}</td>
        <td>{row.townName}</td>
        <td>{new Date(row.startTime).toLocaleString()}</td>
        <td>{new Date(row.endTime).toLocaleString()}</td>
        <td>
          <Tooltip
            title="More Details"
            arrow
            placement="left"
            size="md"
            variant="soft"
          >
            <IconButton
              aria-label="more info"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleHuntMoreInfoClick}
            >
              <OpenInNewRounded />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {isOpen && (
            <Sheet variant="plain" sx={{ p: 2, borderRadius: "md" }}>
              <HuntDetail
                hunt={row}
                userActiveHuntId={userActiveHuntId}
                handleJoin={handleJoin}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleExit={handleExit}
              />
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default Row;
