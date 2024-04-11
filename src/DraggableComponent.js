import React, { useState } from "react";

import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const DraggableArea = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="draggable-wrapper">
      <h1>draggable component</h1>

      <button onClick={handleOpen} className="openBtn">
        Open
      </button>

      <PopUpComponent isOpen={isOpen} handleClose={handleClose} />
    </div>
  );
};

const PopUpComponent = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <Draggable
      axis="both"
      bounds="parent"
      handle=".handle"
      defaultPosition={{ x: 225, y: 8 }}
    >
      <div className="draggable-textarea draggable-container">
        <Resizable>
          <div
            className="box"
            style={{
              minWidth: "300px",
              minHeight: "350px",
              maxHeight: "450px",
              maxWidth: "500px",
              border: "1px solid #ddd",
              resize: "both",
              overflow: "auto",
            }}
          >
            <div className="handle">
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
            </div>
            <span>Contents</span>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default DraggableArea;
