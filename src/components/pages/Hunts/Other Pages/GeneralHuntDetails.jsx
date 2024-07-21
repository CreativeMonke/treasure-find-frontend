import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HuntDetailsPage from "./HuntDetailsPage";
import { Button, Box, Typography } from "@mui/joy";
import { ModalProvider } from "../Context/modalContext";
import { useLocation, useParams } from "react-router-dom";
import { getAllLocationsByHuntId } from "../../../../features/locations/locationSlice";
import { getHuntOptionsByHuntId } from "../../../../features/hunt/huntSlice";

export default function GeneralHuntDetails() {
  const [loading, setLoading] = useState(false);
  const [huntDetails, setHuntDetails] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: huntId } = useParams();
  const { huntData: initialHuntData } = location.state || {};
  const locations =
    useSelector((state) => state.locations.locationsByHuntId[huntId]) || [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let huntDetailsData = initialHuntData;

        if (!huntDetailsData) {
          const result = await dispatch(getHuntOptionsByHuntId(huntId));
          huntDetailsData = result.payload.hunt;
        }

        setHuntDetails(huntDetailsData);

        if (!locations.length) {
          await dispatch(getAllLocationsByHuntId(huntId));
        }
      } catch (error) {
        console.error("Error fetching hunt details or locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, huntId, initialHuntData, locations.length]);
  const {
    huntName,
    townName,
    startTime,
    endTime,
    location_ids = [],
    participating_user_ids = [],
  } = huntDetails;

  const nrOfLocations = locations.length;
  const nrOfUsers = participating_user_ids.length;

  return (
    <React.Fragment>
      <ModalProvider>
        {!loading && huntDetails._id && locations.length && (
          <HuntDetailsPage
            completeHuntData={huntDetails}
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
