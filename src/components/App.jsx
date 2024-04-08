import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import PageStructureWithRouter from "./PageStructureWithRouter";
import { useDispatch } from "react-redux";
import { fetchLocations } from "../features/locations/locationSlice.js";
import { checkLogin } from "../features/auth/authSlice.js";
import { getAnswersByUserId } from "../features/answers/answerSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin()).then((action) => {
      console.log(action);
      if (action.error == null) {
        dispatch(fetchLocations());
        dispatch(getAnswersByUserId());
      }
    });
  }, [dispatch]);
  return (
    <CssVarsProvider defaultMode="system">
      <BrowserRouter>
        <PageStructureWithRouter />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
