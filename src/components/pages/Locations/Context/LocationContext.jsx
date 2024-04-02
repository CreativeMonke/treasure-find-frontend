import React, { createContext, useState, useContext, useEffect } from "react";
import { default as dummyData } from "../../../locationsExamples";
import axios from "axios";
import { AuthContext } from "../../../AuthContext.js";

const LocationContext = createContext();
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const useLocations = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  console.log(AuthContext);
  async function getLocationData() {
    if (!isLoggedIn) {
      console.log("No Logged");
      return;
    }

    try {
      const res = await axios.get(`${apiUrl}locations/all`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getLocationData();
    // Load location data here
    // dummyLocations is an array of locations
    setLocations(dummyData);
  }, [isLoggedIn]);

  return (
    <LocationContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationContext.Provider>
  );
};
