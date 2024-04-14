import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getNumberOfCorrectAnswers } from "../../../../../../features/answers/answerSlice";
import { Typography } from "@mui/joy";

function NrOfCorrectAnswers() {
    const [nrOfCorrectAnswers, setNrOfCorrectAnswers] = useState(0);
  const [nrOfAnswers, setNrOfAnswers] = useState(0);
  const dispatch = useDispatch();
  const {t} = useTranslation()
  async function waitForNumberOfCorrectAnswers() {
    const res = await dispatch(getNumberOfCorrectAnswers()).unwrap();
    setNrOfCorrectAnswers(res.numberOfCorrectAnswers);
    setNrOfAnswers(res.numberOfAnswers);
  }
  useEffect(() => {
    waitForNumberOfCorrectAnswers();
  }, []);
  return (
    <Fragment>
      <Typography level="title-md" color="primary">
        {`${t("preliminaryResults")}: `}
        <Typography level="title-lg" color="success">
          {nrOfCorrectAnswers}
        </Typography>
        {` ${t("correctAnswers")} ${t("outOf")} `}
        <Typography level="title-lg" color="warning">
          {nrOfAnswers}
        </Typography>
        {` ${t("answers").toLowerCase()}`}
      </Typography>
    </Fragment>
  );
}
export default NrOfCorrectAnswers;