import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    const buttonRect = triggerRef.current.getBoundingClientRect();

    anime({
      targets: ".my-component .el",
      overflow: "hidden",
      minWidth: 0,
      minHeight: 0,
      height: 20,
      width: 45,
      translateX: buttonRect.left - position.x,
      translateY: buttonRect.top - position.y,
      duration: 300,
      easing: "easeOutQuad",
      complete: () => {
        setIsOpen(false);
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
      },
    });
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const triggerRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current !== null && !isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    } else {
      anime({
        targets: ".el",
        scale: 0,
        duration: 0,
      });

      anime({
        targets: ".el",
        scale: [{ value: 1, easing: "easeOutQuad", duration: 200 }],
      });
    }
  }, [isOpen]);

  return (
    <div className="my-component">
      <button onClick={handleOpen} ref={triggerRef}>
        open
      </button>

      {isOpen && (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: position.x, y: position.y }}
          bounds="parent"
          onDrag={handleDrag}
        >
          <Resizable width={10} height={10}>
            <div
              className="component-container el"
              style={{
                border: "1px solid #ddd",
                resize: "both",
                overflow: "auto",
                transitionTimingFunction: "ease-out",
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
