import React, { useState } from "react";
import { Button } from "@mui/joy";
import CreateLocationModal from "./CreateLocationModal";
import { useTranslation } from "react-i18next";
function CreateButton() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleClick() {
    setIsCreateModalOpen(!isCreateModalOpen);
  }
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <CreateLocationModal
        open={isCreateModalOpen}
        setOpen={setIsCreateModalOpen}
      />
      <Button onClick={handleClick} sx = {{width: "100%"}}>{`${t("new_location")}`}</Button>
    </React.Fragment>
  );
}

export default CreateButton;
