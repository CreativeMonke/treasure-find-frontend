import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import LocationRow from "./LocationRow";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, LinearProgress, Typography } from "@mui/joy";
import CreateButton from "./Create/CreateButton";
import { useTranslation } from "react-i18next";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import { getAllLocationsByAuthorId } from "../../../../features/locations/locationSlice";
function LocationsTable() {
  const locations = useSelector((state) => state.locations.authorLocations);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchLocations() {
      setIsLoading(true);

      try {
        dispatch(getAllLocationsByAuthorId());
      } catch (err) {
        console.error("Failed to login: ", err);
        const errorMessage =
          err?.response?.data?.message || "An error occurred during login";
        console.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, [dispatch]);
  const { t } = useTranslation();
  return (
    <InnerPageSheet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography level="h1">{`${t("edit")} ${t(
            "the_locations"
          )}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider>{`${t("all")} ${t("the_locations")}`}</Divider>
        </Grid>
        <Grid item xs={12}>
          <Sheet variant="plain">
            <Table borderAxis="xBetween" size="md" noWrap stickyFooter={false}>
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
                {isLoading ? (
                  <tr style={{ height: "100px" }}>
                    <td colSpan="5">
                      <LinearProgress size="lg" />
                    </td>
                  </tr>
                ) : (
                  locations.map((location, index) => (
                    <LocationRow
                      key={index + location._id}
                      index={index}
                      location={location}
                    />
                  ))
                )}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
        <Grid item xs={8} xl={10} />
        <Grid item xs={4} xl={2}>
          <CreateButton />
        </Grid>
      </Grid>
    </InnerPageSheet>
  );
}

export default LocationsTable;
