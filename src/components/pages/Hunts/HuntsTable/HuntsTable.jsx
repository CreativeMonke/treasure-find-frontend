import React, { useState } from "react";
import { Box, Table, Sheet, Tooltip } from "@mui/joy";

import HuntDetail from "../HuntDetail";
import { stableSort, getComparator } from "../Utils/tableUtils";
import EditHuntModal from "../Modals/EditHuntModal";
import { useModal } from "../Context/modalContext";
import { useNavigate } from "react-router-dom";
import EnhancedTableHead from "./EnhancedTableHead";
import Row from "./Row";
import EnhancedTableFooter from "./EnhancedTableFooter";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 10 : 25);
  const [page, setPage] = useState(0);

  const handleExpandClick = (id) => {
    setSelectedHuntId((prevId) => (prevId === id ? null : id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event, value) {
    console.log(event, value);
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  }

  const paginatedHunts = stableSort(hunts, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const labelDisplayedRows = ({ from, to, count }) => {
    return `${from}–${to} ${t("outOf")} ${
      count !== -1 ? count : `more than ${to}`
    }`;
  };

  const getLabelDisplayedRowsTo = () => {
    if (hunts.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? hunts.length
      : Math.min(hunts.length, (page + 1) * rowsPerPage);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          minWidth: "300px",
          overflow: "auto",
          maxHeight: "100%",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          hoverRow
          stickyHeader
          stickyFooter
          sx={{
            "--TableCell-headBackground": (theme) =>
              theme.vars.palette.neutral.softBg,
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
            {paginatedHunts.map((hunt) => (
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
          <EnhancedTableFooter
            rowsPerPage={rowsPerPage}
            page={page}
            totalRows={hunts.length}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
            getLabelDisplayedRowsTo={getLabelDisplayedRowsTo}
          />
        </Table>
      </Box>
    </React.Fragment>
  );
}
