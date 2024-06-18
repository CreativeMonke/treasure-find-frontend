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
import { DeleteForeverRounded, MapRounded } from "@mui/icons-material";
import ConfirmationModal from "../../General/ConfirmationModal";
import { useModal } from "./Context/modalContext";
import EditHuntModal from "./Modals/EditHuntModal";

function HuntDetail({
  hunt,
  handleJoin,
  handleEdit,
  handleDelete,
  handleExit,
}) {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const { openModal , modalState } = useModal();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ border: "1px solid" }}
    >
      <Grid item xs={12} md={5}>
        <Typography level="title-md">{hunt.huntName}</Typography>
        <Typography level="body-md">Town: {hunt.townName}</Typography>
        <Typography level="body-md">
          Start Time: {new Date(hunt.startTime).toLocaleString()}
        </Typography>
        <Typography level="body-md">
          End Time: {new Date(hunt.endTime).toLocaleString()}
        </Typography>
        <Typography level="body-md">
          Number of Users: {hunt.participating_user_ids.length}
        </Typography>
        <Typography level="body-md">
          Number of Objectives: {hunt.nrOfObjectives}
        </Typography>
        <Typography level="body-md">
          Duration:{" "}
          {(new Date(hunt.endTime) - new Date(hunt.startTime)) /
            (1000 * 60 * 60)}{" "}
          hours
        </Typography>
      </Grid>
      <Divider orientation="vertical">
        <Chip
          variant="plain"
          size="md"
          sx={{ transform: matchesMd ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          Actions
        </Chip>
      </Divider>
      <Grid item xs={12} md={5}>
        <Grid
          container
          spacing={2}
          rowSpacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={6} md={3}>
            <Button
              variant="solid"
              color="primary"
              size="md"
              onClick={() =>
                openModal("isJoinModalOpen", {
                  title: hunt.huntName,
                  TitleIcon: MapRounded,
                  content: "Are you sure you want to join this hunt?",
                  additionalInfo: "Your current hunt will be ended!",
                  cancelText: "Cancel",
                  saveText: "Join",
                  handleSave: () => handleJoin(hunt),
                })
              }
            >
              Join Hunt
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="solid"
              color="neutral"
              size="md"
              onClick={() =>
                openModal("isEditModalOpen", {
                  huntId: hunt._id,
                  hunt,
                  title: "Edit Hunt",
                  content: "Edit hunt details here.",
                  cancelText: "Cancel",
                  saveText: "Save",
                  onSave: () => handleEdit(hunt),
                })
              }
            >
              Edit Hunt
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="solid"
              color="danger"
              size="md"
              onClick={() =>
                openModal("isDeleteModalOpen", {
                  title: "Confirm Deletion",
                  TitleIcon: DeleteForeverRounded,
                  titleIconColor: "danger",
                  content: "Are you sure you want to delete this hunt?",
                  additionalInfo: "Action is not reversible!",
                  cancelText: "Cancel",
                  saveText: "Delete",
                  saveColor: "danger",
                  onSave: () => handleDelete(hunt),
                })
              }
            >
              Delete Hunt
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="solid"
              size="md"
              color="warning"
              onClick={() =>
                openModal("isExitModalOpen", {
                  title: "Confirm Exit",
                  content: "Are you sure you want to exit this hunt?",
                  cancelText: "No",
                  saveText: "Yes",
                  onSave: () => handleExit(hunt),
                })
              }
            >
              Exit Hunt
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {modalState["isJoinModalOpen"] && <ConfirmationModal modalName="isJoinModalOpen" />}
      {modalState["isEditModalOpen"] && <EditHuntModal modalName="isEditModalOpen" />}{" "}
      <ConfirmationModal modalName="isDeleteModalOpen" />
      <ConfirmationModal modalName="isExitModalOpen" />
    </Grid>
  );
}

export default HuntDetail;
