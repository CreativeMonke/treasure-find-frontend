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
      console.log("Not Logged In");
      return;
    }

    try {
      const res = await axios.get(`${apiUrl}/locations/all`, {
        withCredentials: true,
      });

      // Assuming res.data is the array of location objects
      const locationDetails = res.data.map((location) => ({
        id: location._id, // Replace '_id' with 'id' if your objects have 'id' field
        name: location.name,
        picture: location.picture,
        question: location.question,
        answer: location.answer,
        lat: location.lat,
        lng: location.lng,
      }));

      // Set the locations state with the newly mapped array
      setLocations(locationDetails);
    } catch (err) {
      console.error(err);
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
