import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Option,
  Typography,
} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from "react-i18next";

function EnhancedTableFooter({
  rowsPerPage,
  page,
  totalRows,
  handleChangePage,
  handleChangeRowsPerPage,
  labelDisplayedRows,
  getLabelDisplayedRowsTo,
}) {
  const { t } = useTranslation();

  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <FormControl orientation="horizontal" size="sm">
              <FormLabel>{t("rowsPerPage")}</FormLabel>
              <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </FormControl>
            <Typography textAlign="center" sx={{ minWidth: 80 }}>
              {labelDisplayedRows({
                from: totalRows === 0 ? 0 : page * rowsPerPage + 1,
                to: getLabelDisplayedRowsTo(),
                count: totalRows === -1 ? -1 : totalRows,
              })}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={page === 0}
                onClick={() => handleChangePage(null, page - 1)}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={
                  totalRows !== -1
                    ? page >= Math.ceil(totalRows / rowsPerPage) - 1
                    : false
                }
                onClick={() => handleChangePage(null, page + 1)}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
  );
}

export default EnhancedTableFooter;
