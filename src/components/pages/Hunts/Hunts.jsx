import React from "react";
import { ModalProvider } from "./Context/modalContext";
import HuntsPage from "./HuntsPage";

export default function Hunts(){

    return (<React.Fragment>
        <ModalProvider>
            <HuntsPage />
        </ModalProvider>
    </React.Fragment>);
};