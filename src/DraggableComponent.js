import React, { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const DraggableArea = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    animateOpen();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    animateClose();
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const animateOpen = () => {
    anime({
      targets: ".element",
      translateX: function (el) {
        // Calculate translateX based on the element's data-x attribute
        return el.getAttribute("data-x");
      },
      translateY: function (el, index, total) {
        // Calculate translateY based on the element's index
        return index * 50;
      },
      scale: function (el, index, total) {
        // Calculate scale based on the element's position in the list
        return 1 + index * 0.1;
      },
      duration: 1000,
      easing: "easeInOutQuad",
    });
  };

  const animateClose = () => {
    anime({
      targets: ".draggable-textarea",
      translateY: [0, 100],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 500,
    });
  };

  useEffect(() => {
    anime({
      targets: ".element .el",
      translateX: function (el) {
        return el.getAttribute("data-x");
      },
      translateY: function (el) {
        return el.getAttribute("data-y");
      },
      scale: function (el, i, l) {
        return l - i + 50;
      },

      duration: function () {
        return anime.random(1200, 1800);
      },
      delay: function () {
        return anime.random(0, 400);
      },
      direction: "alternate",
      loop: false,
    });
  }, [handleOpen]);

  return (
    <div className="draggable-wrapper">
      <h1>draggable component</h1>

      <button onClick={() => handleOpen()} className="openBtn">
        Open
      </button>

      <PopUpComponent
        isOpen={isOpen}
        handleClose={() => handleClose()}
        className="element"
      />
    </div>
  );
};

const PopUpComponent = ({ isOpen, handleClose }) => {
  return (
    <Draggable
      axis="both"
      // bounds="parent"
      handle=".handle"
      // defaultPosition={{ x: 225, y: 8 }}
    >
      <div className="element draggable-textarea draggable-container">
        <Resizable>
          <div
            className="box el"
            data-x="100"
            data-y="100"
            style={{
              minWidth: "0",
              minHeight: "0",
              maxHeight: "0",
              maxWidth: "0",
              border: "1px solid #ddd",
              resize: "both",
              overflow: "auto",
            }}
          >
            <div className="handle">
              <button className="close-button" onClick={() => handleClose()}>
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
