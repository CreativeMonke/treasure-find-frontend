///A button to handle adding a new location to the database
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewLocation,
  fetchLocations,
} from "../../../../../features/locations/locationSlice";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import { PlaceRounded } from "@mui/icons-material";
import ImageSection from "./ImageSection";
import SelectLocationSection from "./SelectLocationSection";
import InputField from "../../../components/InputField";
import { useTranslation } from "react-i18next";
function CreateLocationModal(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [latLng, setLatlng] = useState(null);
  const [error, setError] = useState(null);

  const isFormIncomplete = !name || !question || !answer || !imgSrc || !latLng;

  async function handleCreate() {
    if (isFormIncomplete) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    dispatch(
      addNewLocation({
        name,
        question,
        answer,
        imgSrc,
        lat: latLng.lat,
        lng: latLng.lng,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchLocations());
        handleClose();
      })
      .catch((err) => {
        setError(err.message || "Failed to create location.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleClose() {
    props.setOpen(false);
    setName(null);
    setQuestion(null);
    setAnswer(null);
    setImgSrc(null);
    setLatlng(null);
    setError(null);
  }
  return (
    <Modal open={props.open} onClose={() => handleClose()}>
      <ModalDialog
        layout="center"
        sx={{
          mt: 2,
          height: "85dvh",
          width: "95vw",
        }}
      >
        <ModalClose variant="plain" />
        <DialogTitle id="modalTitle">
          <PlaceRounded />
          {t("create_a_new_location")}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Sheet>
            <Grid container spacing={4} sx={{ overflow: "auto", margin: 3 }}>
              <Grid item xs={6} lg={2}>
                <InputField
                  label={t("name")}
                  id="name"
                  placeholder={`${t("enter")} ${t("desiredValue")}(${t(
                    "name"
                  )})`}
                  setValue={setName}
                />
              </Grid>
              <Grid item xs={8} lg={10} />
              <Grid item xs={6} lg={3}>
                <InputField
                  label={t("question")}
                  id="question"
                  placeholder={`${t("enter")} ${t("desiredValue")}(${t(
                    "question"
                  )})`}
                  setValue={setQuestion}
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <InputField
                  label={t("correctAnswer")}
                  id="answer"
                  placeholder={`${t("enter")} ${t("desiredValue")}(${t(
                    "correctAnswer"
                  )})`}
                  setValue={setAnswer}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider>{t("image")}</Divider>
              </Grid>
              <Grid item xs={12}>
                <ImageSection setValue={setImgSrc} value={imgSrc} />
              </Grid>
              <Grid item xs={12}>
                <Divider>{t("location")}</Divider>
              </Grid>
              <Grid item xs={12}>
                <SelectLocationSection setValue={setLatlng} value={latLng} />
              </Grid>
            </Grid>
          </Sheet>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreate}
            disabled={isFormIncomplete || isLoading}
            loading={isLoading}
          >
            {t("createLocation")}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
export default CreateLocationModal;
