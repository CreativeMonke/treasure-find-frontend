import { Box, Link, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";

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

export default EnhancedTableHead;
