import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import PageStructureWithRouter from "./PageStructureWithRouter";
import { useDispatch } from "react-redux";
import {
  getAllLocationsByAuthorId,
  getAllLocationsByUserHuntId,
} from "../features/locations/locationSlice.js";
import { checkLogin } from "../features/auth/authSlice.js";
import { getAnswersByUserId } from "../features/answers/answerSlice.js";
import { getCurrentHunt } from "../features/hunt/huntSlice.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "../theme/theme.js";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function initializeApp() {
      try {
        const action = await dispatch(checkLogin());
        console.log("action", action);
        if (action.error == null) {
          dispatch(getAnswersByUserId());
          dispatch(getAllLocationsByAuthorId());
          dispatch(getAllLocationsByUserHuntId());
          dispatch(getCurrentHunt());
        }
      } catch (err) {
        console.error("Failed to login: ", err);
        const errorMessage =
          err?.response?.data?.message || "An error occurred during login";
        console.error(errorMessage);
      }
    }

    initializeApp();
  }, [dispatch]);
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <PageStructureWithRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}

export default App;
