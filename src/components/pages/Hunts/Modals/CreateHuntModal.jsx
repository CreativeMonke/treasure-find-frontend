import React, { useEffect, useState } from "react";
import { useModal } from "../Context/modalContext";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import GridItem from "../../components/GridItem";
import CityPicker from "../../../General/CityPicker";
import SelectionTable from "../../../General/SelectionTable/SelectionTable";
import DatePick from "../../../General/DatePick/DatePick";
import SwitchBox from "../../../General/SwitchBox/SwitchBox";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationsByAuthorId } from "../../../../features/locations/locationSlice";

export default function CreateHuntModal({ modalName }) {
  const dispatch = useDispatch();
  const { modalState, closeModal } = useModal();
  const { modalProps } = modalState;
  const {
    handleSave,
    titleText = "Create Hunt",
    cancelText = "Cancel",
    cancelColor = "neutral",
    saveText = "Save",
    saveColor = "primary",
  } = modalProps;
  const [loading, setLoading] = useState(false);
  const [locationsInHunt, setLocationsInHunt] = useState([]);
  const [mergedLocations, setMergedLocations] = useState([]);

  const [fieldHuntName, setFieldHuntName] = useState("");
  const [fieldHuntTown, setFieldHuntTown] = useState("");
  const [fieldHuntLocationsIds, setFieldHuntLocationsIds] = useState();

  const [fieldHuntStartTime, setFieldHuntStartTime] = useState(new Date());
  const [fieldHuntEndTime, setFieldHuntEndTime] = useState(new Date());
  const [fieldAreAnswersReady, setFieldAreAnswersReady] = useState(false);

  const authorLocations =
    useSelector((state) => state.locations.authorLocations) || [];

  useEffect(() => {
    if (modalState[modalName]) {
      const fetchHuntLocations = async () => {
        setLoading(true);
        try {
          const huntLocations = [];
          setLocationsInHunt(huntLocations);
          const merged = [...authorLocations, ...huntLocations];

          const uniqueMergedLocations = Array.from(
            new Set(merged.map((location) => location._id))
          ).map((id) => merged.find((location) => location._id === id));

          setMergedLocations(uniqueMergedLocations);
        } catch (error) {
          console.error("Failed to fetch hunt locations:", error);
        } finally {
          setLoading(false);
        }
      };

      if (!authorLocations.length) {
        dispatch(getAllLocationsByAuthorId()).then(() => {
          fetchHuntLocations();
        });
      } else {
        fetchHuntLocations();
      }
    }
  }, [dispatch, modalName, modalState, authorLocations.length]);

  async function handleSaveClick() {
    setLoading(true);
    const newHunt = {
      huntName: fieldHuntName,
      townName: fieldHuntTown,
      location_ids: fieldHuntLocationsIds,
      startTime: fieldHuntStartTime,
      endTime: fieldHuntEndTime,
      areAnswersReady: fieldAreAnswersReady,
    };
    try {
      await handleSave(newHunt);
      handleClose();
    } catch (error) {
      console.error("Failed to save the hunt:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (!loading) closeModal(modalName);
  }

  return (
    <Modal open={modalState[modalName]} onClose={handleClose}>
      <ModalDialog
        layout="center"
        sx={{
          mt: 2,
          height: "80dvh",
          width: "80vw",
        }}
      >
        <ModalClose variant="plain" size="md" onClick={handleClose} />
        <DialogTitle>
          <Typography level="title-lg">{titleText}</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              p: 1,
            }}
          >
            <Grid
              container
              spacing={3}
              rowSpacing={5}
              sx={{
                overflow: "auto",
                height: "100%",
              }}
            >
              <Grid item xs={12} md={4}>
                <GridItem
                  label="Name"
                  value={fieldHuntName}
                  onChange={setFieldHuntName}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CityPicker
                  label="Town"
                  value={fieldHuntTown}
                  onChange={setFieldHuntTown}
                />
              </Grid>

              <Grid item xs={12} md={4} xl={2}>
                <DatePick
                  label="Start Time"
                  onChange={setFieldHuntStartTime}
                  date={fieldHuntStartTime}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={2}>
                <DatePick
                  label="End Time"
                  onChange={setFieldHuntEndTime}
                  date={fieldHuntEndTime}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={2}>
                <SwitchBox
                  text="Are the answers to be shown by default?"
                  helperText="They will be visible to all users upon the completion of the hunt"
                  label="Show Answers by default"
                  checked={fieldAreAnswersReady}
                  setChecked={setFieldAreAnswersReady}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectionTable
                  label="Locations"
                  locations={mergedLocations}
                  selectedLocations={locationsInHunt}
                  onChange={setFieldHuntLocationsIds}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            spacing={1.5}
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Grid item xs={6}>
              <Button
                color={cancelColor}
                onClick={handleClose}
                disabled={loading}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {cancelText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color={saveColor}
                onClick={handleSaveClick}
                loading={loading}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {saveText}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
