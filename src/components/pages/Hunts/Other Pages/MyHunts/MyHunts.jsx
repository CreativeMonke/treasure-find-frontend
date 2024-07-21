import React from "react";
import { useSelector } from "react-redux";
import HuntsPage from "../../HuntsPage";
import { ModalProvider } from "../../Context/modalContext";

export default function MyHunts() {
  const userId = useSelector((state) => state.auth.user._id);
  return (
    <React.Fragment>
      <ModalProvider>
        <HuntsPage globalFilter={{ key: "author_id", value: userId }} />
      </ModalProvider>
    </React.Fragment>
  );
}
