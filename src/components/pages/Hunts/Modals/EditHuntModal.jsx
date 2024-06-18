import React, { useEffect, useState } from "react";
import { useModal } from "../Context/modalContext";
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import { ArrowRightAlt, InfoRounded } from "@mui/icons-material";
import GridItem from "../../components/GridItem";
import CityPicker from "../../../General/CityPicker";
import VerticalMultiSelect from "../../../General/VerticalMultipleSelect";
import SelectionTable from "../../../General/SelectionTable/SelectionTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLocationsByAuthorId,
  getAllLocationsByHuntId,
} from "../../../../features/locations/locationSlice";
import DatePick from "../../../General/DatePick/DatePick";
import SwitchBox from "../../../General/SwitchBox/SwitchBox";

export default function EditHuntModal({ modalName }) {
  const dispatch = useDispatch();
  const { modalState, closeModal } = useModal();
  const { modalProps } = modalState;
  const {
    huntId,
    handleSave,
    hunt,
    additionalInfo,
    AdditionalInfoIcon = InfoRounded,
    additionalInfoIconColor = "neutral",
    cancelText = "Cancel",
    cancelColor = "neutral",
    saveText = "Save",
    saveColor = "primary",
  } = modalProps;

  const [loading, setLoading] = useState(false);
  const [locationsInHunt, setLocationsInHunt] = useState([]);
  const [mergedLocations, setMergedLocations] = useState([]);

  const [fieldHuntName, setFieldHuntName] = useState(hunt.huntName);
  const [fieldHuntTown, setFieldHuntTown] = useState(hunt.townName);
  const [fieldHuntLocationsIds, setFieldHuntLocationsIds] = useState();
  ///New date of the current time

  const [fieldHuntStartTime, setFieldHuntStartTime] = useState(
    hunt.startTime ? new Date(hunt.startTime) : new Date()
  );
  const [fieldHuntEndTime, setFieldHuntEndTime] = useState(
    hunt.endTime ? new Date(hunt.endTime) : new Date()
  );
  const [fieldAreAnswersReady, setFieldAreAnswersReady] = useState(false);

  const authorLocations =
    useSelector((state) => state.locations.authorLocations) || [];

  useEffect(() => {
    if (modalState[modalName]) {
      const fetchHuntLocations = async () => {
        setLoading(true);
        try {
          const huntLocations = await dispatch(
            getAllLocationsByHuntId(huntId)
          ).unwrap();
          setLocationsInHunt(huntLocations);
          setMergedLocations([...authorLocations, ...huntLocations]);
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
  }, [dispatch, huntId, modalName, modalState, authorLocations.length]);

  function handleClose() {
    if (!loading) closeModal(modalName);
  }

  return (
    <React.Fragment>
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
            <Typography level="title-lg">Editing</Typography>
            <ArrowRightAlt />
            <Typography level="title-lg" color="warning">
              {hunt.huntName}
            </Typography>
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
                    value={hunt.townName}
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
                    text="Are the answers ready to be shown?"
                    helperText="They will be visible to all users"
                    label="Show Answers"
                    checked={fieldAreAnswersReady}
                    setChecked={setFieldAreAnswersReady}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectionTable
                    huntTown
                    label="Locations"
                    locations={mergedLocations}
                    selectedLocations={locationsInHunt}
                    onChange={setFieldHuntLocationsIds}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
