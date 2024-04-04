import React, { useState } from "react";
import { Button } from "@mui/joy";
import CreateLocationModal from "./CreateLocationModal";
function CreateButton() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleClick() {
    setIsCreateModalOpen(!isCreateModalOpen);
  }
  return (
    <React.Fragment>
      <CreateLocationModal
        open={isCreateModalOpen}
        setOpen={setIsCreateModalOpen}
      />
      <Button onClick={handleClick} sx = {{width: "100%"}}>Add new</Button>
    </React.Fragment>
  );
}

export default CreateButton;
