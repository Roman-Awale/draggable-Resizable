import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    const buttonRect = triggerRef.current.getBoundingClientRect();

    anime({
      targets: ".my-component .el",
      translateX: buttonRect.left - position.x,
      translateY: buttonRect.top - position.y,
      duration: 500,
      easing: "easeOutQuad",
      complete: () => {
        setIsOpen(false);
      },
    });
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const triggerRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current !== null) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
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
          defaultPosition={{ x: position.x, y: position.y }}
          bounds="body"
          onDrag={handleDrag}
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
