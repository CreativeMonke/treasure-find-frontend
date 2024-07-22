import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Sheet,
  Grid,
  Typography,
  Button,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import TimelineCard from "../../../Poi/TimelineCard";
import WidgetCard from "../../Landing/WidgetCard";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMapOverview from "./MapOverview/LocationMapOverview";
import WidgetInfoCard from "../../../General/Widgets/WidgetInfoCard";
import {
  EventAvailableRounded,
  EventBusyRounded,
  HelpOutlineRounded,
  LocationCityRounded,
  PeopleRounded,
  PlaceRounded,
} from "@mui/icons-material";
import WidgetDateCard from "../../../General/Widgets/WidgetDateCard";
import { useModal } from "../Context/modalContext";
import ConfirmationModal from "../../../General/ConfirmationModal";
import { handleEdit, handleExit } from "../Handlers/huntHandlers";
import { useNavigate } from "react-router-dom";
import EditHuntModal from "../Modals/EditHuntModal";
import RemainingTimeGeneral from "../../../General/RemainingTime/RemainingTimeGeneral";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";

function HuntDetailsPage({
  huntName,
  townName,
  startTime,
  endTime,
  numberOfLocations,
  numberOfUsers,
  completeHuntData,
  locations = [],
  loading,
}) {
  const currentHuntDetails = useSelector(
    (state) => state.hunt.currentHuntInfo.completeHuntData
  );
  const currentUserId = useSelector((state) => state.auth.user._id);
  const { openModal, modalState } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography level="h2">{huntName} - details</Typography>
        <Grid container spacing={3} sx={{ mt: 2, height: "100%" }}>
          <Grid item xs={12} md={9}>
            <LocationMapOverview locations={locations} />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <WidgetDateCard
              title="Start Time"
              icon={<EventAvailableRounded />}
              dateTime={startTime}
            />

            <WidgetDateCard
              title="End Time"
              icon={<EventBusyRounded />}
              dateTime={endTime}
            />

            <WidgetInfoCard
              title="Current Status"
              icon={<HelpOutlineRounded />}
            >
              <RemainingTimeGeneral huntInfo={completeHuntData} />
            </WidgetInfoCard>

            <WidgetInfoCard
              title="Number of Locations"
              icon={<PlaceRounded />}
              value={numberOfLocations}
              additionalText="locations"
            />

            <WidgetInfoCard
              title="Participants"
              icon={<PeopleRounded />}
              value={numberOfUsers}
              additionalText="users"
            />

            <WidgetInfoCard
              title="Town"
              icon={<LocationCityRounded />}
              value={townName}
            />

            <Box>
              <Typography level="body1">Actions</Typography>
              {currentHuntDetails?._id === completeHuntData?._id && (
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    openModal("isExitModalOpen", {
                      title: "Confirm Exit",
                      content: "Are you sure you want to exit this hunt?",
                      cancelText: "No",
                      saveText: "Yes",
                      handleSave: async () => {
                        await handleExit(dispatch);
                        navigate("/hunts");
                      },
                    })
                  }
                >
                  Exit Hunt
                </Button>
              )}
              {currentUserId === completeHuntData.author_id && (
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    openModal("isEditModalOpen", {
                      huntId: completeHuntData._id,
                      hunt: completeHuntData,
                      titleText: "Editing",
                      cancelText: "Cancel",
                      saveText: "Save",
                      handleSave: (updatedHunt) =>
                        handleEdit(dispatch, updatedHunt),
                    })
                  }
                >
                  Edit Hunt
                </Button>
              )}
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => navigate("/hunts")}
              >
                Go to Hunts Page
              </Button>
            </Box>
          </Grid>
        </Grid>
      </InnerPageSheet>
      {modalState["isExitModalOpen"] && (
        <ConfirmationModal modalName="isExitModalOpen" />
      )}
      {modalState["isEditModalOpen"] && (
        <EditHuntModal modalName="isEditModalOpen" />
      )}
    </React.Fragment>
  );
}

export default HuntDetailsPage;
