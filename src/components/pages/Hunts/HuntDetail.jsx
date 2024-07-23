import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  useTheme,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import {
  AddBoxRounded,
  DeleteForeverRounded,
  EditNoteRounded,
  LogoutRounded,
  MapRounded,
} from "@mui/icons-material";
import ConfirmationModal from "../../General/ConfirmationModal";
import { useModal } from "./Context/modalContext";
import EditHuntModal from "./Modals/EditHuntModal";
import { useDispatch, useSelector } from "react-redux";
import DownloadCSVButton from "../UserAnswers/adminView/Csv/DownloadCsv";
import "./Other Pages/Css/HuntDetailsPage.css";
import { useTranslation } from "react-i18next";

function HuntDetail({
  hunt,
  handleJoin,
  handleEdit,
  handleDelete,
  handleExit,
  userActiveHuntId,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const { openModal, modalState } = useModal();
  const currentUserId = useSelector((state) => state.auth.user._id);
  const { t } = useTranslation();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      columns={30}
      sx={{ border: "1px solid" }}
    >
      <Grid item xs={30} md={14}>
        <Typography level="title-md">{hunt.huntName}</Typography>
        <Typography level="body-md">
          {t("town")}: {hunt.townName}
        </Typography>
        <Typography level="body-md">
          {t("startTime")}: {new Date(hunt.startTime).toLocaleString()}
        </Typography>
        <Typography level="body-md">
          {t("endTime")}: {new Date(hunt.endTime).toLocaleString()}
        </Typography>
        <Typography level="body-md">
          {t("numberOfUsers")}: {hunt.participating_user_ids?.length}
        </Typography>
        <Typography level="body-md">
          {t("numberOfObjectives")}: {hunt.location_ids?.length}
        </Typography>
        <Typography level="body-md">
          {t("duration")}:{" "}
          {(new Date(hunt.endTime) - new Date(hunt.startTime)) /
            (1000 * 60 * 60)}{" "}
          {t("hours")}
        </Typography>
      </Grid>
      <Divider orientation="vertical">
        <Chip
          variant="plain"
          size="md"
          sx={{ transform: matchesMd ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {t("actions")}
        </Chip>
      </Divider>
      <Grid item xs={30} md={14}>
        <Box>
          <Grid container spacing={2} rowSpacing={2}>
            {userActiveHuntId !== hunt._id && (
              <Grid item xs={6} lg={3} className="ButtonGrid">
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<AddBoxRounded />}
                  onClick={() =>
                    openModal("isJoinModalOpen", {
                      title: hunt.huntName,
                      TitleIcon: MapRounded,
                      content: t("confirmJoinHunt"),
                      cancelText: t("cancel"),
                      saveText: t("join"),
                      handleSave: () => handleJoin(hunt),
                    })
                  }
                >
                  {t("joinHunt")}
                </Button>
              </Grid>
            )}
            {currentUserId === hunt.author_id && (
              <Grid item xs={6} lg={3} className="ButtonGrid">
                <Button
                  variant="solid"
                  color="neutral"
                  startDecorator={<EditNoteRounded />}
                  onClick={() =>
                    openModal("isEditModalOpen", {
                      huntId: hunt._id,
                      hunt,
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
            {currentUserId === hunt.author_id && (
              <Grid item xs={6} lg={3} className="ButtonGrid">
                <Button
                  variant="solid"
                  color="danger"
                  startDecorator={<DeleteForeverRounded />}
                  onClick={() =>
                    openModal("isDeleteModalOpen", {
                      title: t("confirmDeletion"),
                      TitleIcon: DeleteForeverRounded,
                      titleIconColor: "danger",
                      content: t("areYouSureDeleteHunt"),
                      additionalInfo: t("notReversible"),
                      cancelText: t("cancel"),
                      saveText: t("deleteHunt"),
                      saveColor: "danger",
                      handleSave: () => handleDelete(hunt._id),
                    })
                  }
                >
                  {t("deleteHunt")}
                </Button>
              </Grid>
            )}
            {currentUserId === hunt.author_id && (
              <Grid item xs={6} lg={3} className="ButtonGrid">
                <DownloadCSVButton huntId={hunt._id} huntName={hunt.huntName} />
              </Grid>
            )}
            {userActiveHuntId === hunt._id && (
              <Grid item xs={6} lg={3} className="ButtonGrid">
                <Button
                  variant="solid"
                  color="warning"
                  startDecorator={<LogoutRounded />}
                  onClick={() =>
                    openModal("isExitModalOpen", {
                      title: t("confirmExitHunt"),
                      content: t("confirmExit"),
                      cancelText: t("no"),
                      saveText: t("yes"),
                      handleSave: () => handleExit(),
                    })
                  }
                >
                  {t("exitHunt")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
      {modalState["isJoinModalOpen"] && (
        <ConfirmationModal modalName="isJoinModalOpen" />
      )}
      {modalState["isEditModalOpen"] && (
        <EditHuntModal modalName="isEditModalOpen" />
      )}{" "}
      <ConfirmationModal modalName="isDeleteModalOpen" />
      <ConfirmationModal modalName="isExitModalOpen" />
    </Grid>
  );
}

export default HuntDetail;
