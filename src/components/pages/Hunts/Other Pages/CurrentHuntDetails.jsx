import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HuntDetailsPage from "./HuntDetailsPage";
import { Button, Box, Typography } from "@mui/joy";
import { getAllLocationsByUserHuntId } from "../../../../features/locations/locationSlice";
import { ModalProvider } from "../Context/modalContext";

export default function CurrentHuntDetails() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllLocationsByUserHuntId());
      setLoading(false);
    };
    fetchData();
  }, []);

  const currentHuntDetails = useSelector(
    (state) => state.hunt.currentHuntInfo.completeHuntData
  );
  const locations = useSelector((state) => state.locations.huntLocations);

  if (!currentHuntDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography level="h4">You are not currently in a hunt</Typography>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Go to Hunts Page
        </Button>
      </Box>
    );
  }

  const {
    _id,
    huntName,
    townName,
    startTime,
    endTime,
    location_ids = [],
    participating_user_ids = [],
  } = currentHuntDetails;

  const nrOfLocations = location_ids.length;
  const nrOfUsers = participating_user_ids.length;

  return (
    <React.Fragment>
      <ModalProvider>
        {currentHuntDetails._id && (
          <HuntDetailsPage
            _id={_id}
            completeHuntData={currentHuntDetails}
            huntName={huntName}
            townName={townName}
            startTime={startTime}
            endTime={endTime}
            numberOfLocations={nrOfLocations}
            numberOfUsers={nrOfUsers}
            locations={locations}
            loading={loading}
          />
        )}
      </ModalProvider>
    </React.Fragment>
  );
}
