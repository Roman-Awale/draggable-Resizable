import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { easeOut } from "framer-motion";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // anime({
    //   targets: ".my-component .el",
    //   translateX: 100,
    //   translateY: 100,
    //   scale: 2,
    //   duration: 500,
    //   easing: "easeOutQuad",
    // });
  };

  const handleClose = () => {
    if (triggerRef.current !== null) {
      setInitialX(triggerRef.current.offsetLeft);
      setInitialY(triggerRef.current.offsetTop);
      console.log("yo");
      console.log(initialX, initialY);
    }
    anime({
      targets: ".my-component .el",
      position: `${(initialX + "px", initialY + "px")}`,
      duration: 5000,
      easing: "easeOutQuad",
    });

    setTimeout(() => {
      setIsOpen(false);
    }, 50000);
  };

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: ".my-component .el",
        translateX: 10,
        translateY: 10,
        scale: 1,
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }, [isOpen]);

  const triggerRef = useRef(null);

  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  useEffect(() => {
    if (triggerRef.current !== null) {
      setInitialX(triggerRef.current.offsetLeft);
      setInitialY(triggerRef.current.offsetTop);

      console.log(initialX, initialY);
    }
  }, [triggerRef]);

  return (
    <div className="my-component">
      <button onClick={handleOpen} ref={triggerRef}>
        open
      </button>

      {isOpen && (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: initialX, y: initialY }}
          bounds="body"
        >
          <Resizable width={10} height={10}>
            <div
              className="component-container el"
              style={{
                border: "1px solid #ddd",
                resize: "both",
                overflow: "auto",
                transform: "scale(0)",
              }}
            >
              <div className="handle">
                <button onClick={handleClose}>close</button>
              </div>
              <span>Contents</span>
            </div>
          </Resizable>
        </Draggable>
      )}
    </div>
  );
};

export default MyComponent;
