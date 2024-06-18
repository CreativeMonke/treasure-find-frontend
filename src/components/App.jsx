import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import PageStructureWithRouter from "./PageStructureWithRouter";
import { useDispatch } from "react-redux";
import { getAllLocationsByHuntId } from "../features/locations/locationSlice.js";
import { checkLogin } from "../features/auth/authSlice.js";
import { getAnswersByUserId } from "../features/answers/answerSlice.js";
import { getGlobalHuntInfo } from "../features/hunt/huntSlice.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin()).then((action) => {
      if (action.error == null) {
        dispatch(getAnswersByUserId()).then(
          dispatch(getAllLocationsByHuntId())
        );
      }
    });
  }, [dispatch]);
  return (
    <CssVarsProvider defaultMode="system">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <PageStructureWithRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}

export default App;
