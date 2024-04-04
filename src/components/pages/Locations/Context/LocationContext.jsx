import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext.js";

export const LocationContext = createContext(null);
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const useLocations = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [needUpdateLocations, setNeedUpdateLocations] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Use useCallback to memoize the function so its reference stays stable as long as isLoggedIn doesn't change
  const getLocationData = useCallback(async () => {
    if (!isLoggedIn) {
      console.log("Not Logged In");
      return;
    }

    try {
      const res = await axios.get(`${apiUrl}locations/all`, {
        withCredentials: true,
      });

      const locationDetails = res.data.data.map((location) => ({
        id: location._id,
        name: location.name,
        picture: location.picture,
        question: location.question,
        answer: location.answer,
        lat: location.lat,
        lng: location.lng,
      }));
      setLocations(locationDetails);
      setNeedUpdateLocations(false);
    } catch (err) {
      console.error(err);
    }
  }, [isLoggedIn]); // Dependency array for useCallback

  useEffect(() => {
    getLocationData();
  }, [isLoggedIn, needUpdateLocations, getLocationData]); // Now getLocationData's reference is stable

  async function addNewLocation(props) {
    try {
      const res = await axios.post(`${apiUrl}locations/create`, props, {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteLocation(id) {
    try {
      await axios.delete(`${apiUrl}locations/delete/${id}`, {
        withCredentials: true,
      });
      // Remove the deleted location from the state
      setLocations(locations.filter((location) => location.id !== id));
      setNeedUpdateLocations(true); // Optionally trigger a refresh if needed
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  }

  const value = {
    locations,
    setLocations,
    setNeedUpdateLocations,
    addNewLocation,
    deleteLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
