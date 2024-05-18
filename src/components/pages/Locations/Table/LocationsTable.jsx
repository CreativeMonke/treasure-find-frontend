import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import LocationRow from "./LocationRow";
import { useSelector } from "react-redux";
import { Divider, Grid, Typography } from "@mui/joy";
import CreateButton from "./Create/CreateButton";
import { useTranslation } from "react-i18next";
function LocationsTable() {
  const locations = useSelector((state) => state.locations.locations);
  const { t } = useTranslation();
  return (
    <Sheet
      variant="soft"
      sx={{
        p: 3,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography level="h1">{`${t("edit")} ${t("the_locations")}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>{`${t("all")} ${t("the_locations")}`}</Divider>
        </Grid>
        <Grid item xs={12}>
          <Sheet variant="plain">
            <Table
              borderAxis="xBetween"
              size="md"
              noWrap
              stickyFooter={false}
            >
              <thead>
                <tr>
                  <th width="10%">#</th>
                  <th>{`${t("name")}`}</th>
                  <th>{`${t("question")}`}</th>
                  <th>{`${t("correctAnswer")}`}</th>
                  <th width="80px"></th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <LocationRow
                    key={index + location._id}
                    index={index}
                    location={location}
                  />
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
        <Grid item xs={8} xl={10} />
        <Grid item xs={4} xl={2}>
          <CreateButton />
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default LocationsTable;
