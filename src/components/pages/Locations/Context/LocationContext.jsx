import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext.js";

export const LocationContext = createContext(null);
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const useLocations = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [needUpdateLocations,setNeedUpdateLocations] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  async function getLocationData() {
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
  }

 async function addNewLocation(props){
    try{
      const res = await axios.post(`${apiUrl}locations/create`, props, {
        withCredentials: true,
      });
      console.log(res);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getLocationData();
  }, [isLoggedIn,needUpdateLocations]);
  const value = { locations, setLocations , setNeedUpdateLocations,
    addNewLocation
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
