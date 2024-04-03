import React, { useState } from "react";
import EditLocationModal from "./Edit/EditLocationModal.jsx";
function LocationRow(props) {
  const [open, setOpen] = useState(false);
  function handleClick(evt) {
    setOpen(true);
  }
  return (
    <React.Fragment>
      <EditLocationModal open={open} setOpen={setOpen} index={props.index} id = {props.id}/>
      <tr
        onClick={(evt) => {
          handleClick(evt);
        }}
      >
        <td>{props.index + 1}</td>
        <td>{props.name}</td>
        <td>{props.question}</td>
        <td>{props.answer}</td>
      </tr>
    </React.Fragment>
  );
}
export default LocationRow;
