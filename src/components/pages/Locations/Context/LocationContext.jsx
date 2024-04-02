import React, { createContext, useState, useContext, useEffect } from "react";
import {default as dummyData} from "../../../locationsExamples";

const LocationContext = createContext();

export const useLocations = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Load location data here
    // dummyLocations is an array of locations
    setLocations(dummyData);
  }, []);

  return (
    <LocationContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationContext.Provider>
  );
};
