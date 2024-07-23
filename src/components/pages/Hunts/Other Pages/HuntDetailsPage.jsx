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
  AddBoxRounded,
  EditNoteRounded,
  EventAvailableRounded,
  EventBusyRounded,
  HelpOutlineRounded,
  LocationCityRounded,
  LogoutRounded,
  MapRounded,
  OpenInNewRounded,
  PeopleRounded,
  PlaceRounded,
} from "@mui/icons-material";
import WidgetDateCard from "../../../General/Widgets/WidgetDateCard";
import { useModal } from "../Context/modalContext";
import ConfirmationModal from "../../../General/ConfirmationModal";
import { handleEdit, handleExit, handleJoin } from "../Handlers/huntHandlers";
import { useNavigate } from "react-router-dom";
import EditHuntModal from "../Modals/EditHuntModal";
import RemainingTimeGeneral from "../../../General/RemainingTime/RemainingTimeGeneral";
import InnerPageSheet from "../../PageStructure/InnerPageSheet";
import DownloadCSVButton from "../../UserAnswers/adminView/Csv/DownloadCsv";
import "./Css/HuntDetailsPage.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <InnerPageSheet>
        <Typography level="h2">
          {huntName} - {t("details").toLowerCase()}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2, height: "100%" }}>
          <Grid item xs={12} md={9}>
            {numberOfLocations !== 0 ? (
              <LocationMapOverview locations={locations} />
            ) : (
              <Sheet
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "40dvh",
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography level="h3" color="warning" p={2}>
                  {t("addLocationMessage")}
                </Typography>
              </Sheet>
            )}
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
              title={t("startTime")}
              icon={<EventAvailableRounded />}
              dateTime={startTime}
            />

            <WidgetDateCard
              title={t("endTime")}
              icon={<EventBusyRounded />}
              dateTime={endTime}
            />

            <WidgetInfoCard
              title={t("currentStatus")}
              icon={<HelpOutlineRounded />}
            >
              <RemainingTimeGeneral huntInfo={completeHuntData} />
            </WidgetInfoCard>

            <WidgetInfoCard
              title={t("numberOfLocations")}
              icon={<PlaceRounded />}
              value={numberOfLocations}
              additionalText={t("locations")}
            />

            <WidgetInfoCard
              title={t("participants")}
              icon={<PeopleRounded />}
              value={numberOfUsers}
              additionalText={t("users")}
            />

            <WidgetInfoCard
              title={t("town")}
              icon={<LocationCityRounded />}
              value={townName}
            />
            <Typography level="title-md" textAlign="center">
              {t("actions")}
            </Typography>
            <Box>
              <Grid container spacing={2} rowSpacing={1}>
                {currentHuntDetails?._id === completeHuntData?._id && (
                  <Grid item xs={6} className="ButtonGrid">
                    <Button
                      variant="solid"
                      size="md"
                      color="warning"
                      startDecorator={<LogoutRounded />}
                      onClick={() =>
                        openModal("isExitModalOpen", {
                          title: t("confirmExit"),
                          content: t("confirmExit"),
                          cancelText: t("no"),
                          saveText: t("yes"),
                          handleSave: async () => {
                            await handleExit(dispatch);
                            navigate("/hunts");
                          },
                        })
                      }
                    >
                      {t("exitHunt")}
                    </Button>
                  </Grid>
                )}
                {currentUserId === completeHuntData.author_id && (
                  <Grid item xs={6} className="ButtonGrid">
                    <Button
                      variant="solid"
                      color="neutral"
                      size="md"
                      startDecorator={<EditNoteRounded />}
                      onClick={() =>
                        openModal("isEditModalOpen", {
                          huntId: completeHuntData._id,
                          hunt: completeHuntData,
                          titleText: t("editing"),
                          cancelText: t("cancel"),
                          saveText: t("save"),
                          handleSave: (updatedHunt) =>
                            handleEdit(dispatch, updatedHunt),
                        })
                      }
                    >
                      {t("editHunt")}
                    </Button>
                  </Grid>
                )}
                {currentHuntDetails?._id !== completeHuntData?._id && (
                  <Grid item xs={6} className="ButtonGrid">
                    <Button
                      variant="solid"
                      color="primary"
                      size="md"
                      startDecorator={<AddBoxRounded />}
                      onClick={() =>
                        openModal("isJoinModalOpen", {
                          title: completeHuntData.huntName,
                          TitleIcon: MapRounded,
                          content: t("joinHuntMessage"),
                          cancelText: t("cancel"),
                          saveText: t("join"),
                          handleSave: async () => {
                            await handleJoin(dispatch, completeHuntData);
                            //navigate("/hunts");
                          },
                        })
                      }
                    >
                      {t("joinHunt")}
                    </Button>
                  </Grid>
                )}
                {currentUserId === completeHuntData.author_id && (
                  <Grid item xs={6} className="ButtonGrid">
                    <DownloadCSVButton
                      huntId={completeHuntData._id}
                      huntName={completeHuntData.huntName}
                    />
                  </Grid>
                )}
                <Grid item xs={6} className="ButtonGrid">
                  <Button
                    variant="outlined"
                    startDecorator={<OpenInNewRounded />}
                    onClick={() => navigate("/hunts")}
                  >
                    {t("goToHunts")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </InnerPageSheet>
      {modalState["isExitModalOpen"] && (
        <ConfirmationModal modalName="isExitModalOpen" />
      )}
      {modalState["isJoinModalOpen"] && (
        <ConfirmationModal modalName="isJoinModalOpen" />
      )}
      {modalState["isEditModalOpen"] && (
        <EditHuntModal modalName="isEditModalOpen" />
      )}
    </React.Fragment>
  );
}

export default HuntDetailsPage;
