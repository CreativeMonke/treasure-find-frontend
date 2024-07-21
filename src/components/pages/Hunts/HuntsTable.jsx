import React from "react";
import {
  Box,
  Table,
  IconButton,
  Link,
  Sheet,
  Typography,
  Tooltip,
} from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";
import HuntDetail from "./HuntDetail";
import { stableSort, getComparator } from "./Utils/tableUtils";
import EditHuntModal from "./Modals/EditHuntModal";
import { useModal } from "./Context/modalContext";
import { OpenInNewRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { t } = useTranslation();
  const headCells = [
    { id: "huntName", label: t("huntName") },
    { id: "townName", label: t("townName") },
    { id: "startTime", label: t("startTime") },
    { id: "endTime", label: t("endTime") },
  ];

  return (
    <thead>
      <tr>
        <th style={{ width: 40 }} aria-label="empty" />
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: "ascending", desc: "descending" }[order]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? "primary.plainColor" : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                endDecorator={
                  <ArrowDownwardIcon
                    sx={{
                      opacity: active ? 1 : 0,
                      transition: "0.2s",
                      transform:
                        active && order === "desc"
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                    }}
                  />
                }
                sx={{
                  "& svg": {
                    transition: "0.2s",
                    transform:
                      active && order === "desc"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  },
                  "&:hover": { "& svg": { opacity: 1 } },
                }}
              >
                <Typography
                  color={active ? "primary" : "neutral"}
                  level="title-md"
                >
                  {headCell.label}
                </Typography>
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
        <th style={{ width: 40 }} aria-label="empty" />
      </tr>
    </thead>
  );
}

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
        <th scope="row">{row.huntName}</th>
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

export default function HuntsTable({
  hunts,
  order,
  orderBy,
  onRequestSort,
  selectedHuntId,
  setSelectedHuntId,
  handleJoin,
  handleEdit,
  handleDelete,
  handleExit,
  userActiveHuntId,
  userCreatedHuntIds,
}) {
  const handleExpandClick = (id) => {
    setSelectedHuntId((prevId) => (prevId === id ? null : id));
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          hoverRow
          sx={{
            "--TableCell-headBackground": "transparent",
            "--TableCell-selectedBackground": (theme) =>
              theme.vars.palette.success.softBg,
          }}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
          <tbody>
            {stableSort(hunts, getComparator(order, orderBy)).map((hunt) => (
              <Row
                color={
                  hunt._id === userActiveHuntId
                    ? "success"
                    : Array.isArray(userCreatedHuntIds) &&
                      userCreatedHuntIds.includes(hunt._id)
                    ? "primary"
                    : "neutral"
                }
                key={hunt._id}
                row={hunt}
                userActiveHuntId={userActiveHuntId}
                isOpen={selectedHuntId === hunt._id}
                onExpandClick={handleExpandClick}
                handleJoin={handleJoin}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleExit={handleExit}
              />
            ))}
          </tbody>
        </Table>
      </Box>
    </React.Fragment>
  );
}
