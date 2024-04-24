import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MyComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [minWidth, setminWidth] = useState(200);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    const buttonRect = triggerRef.current.getBoundingClientRect();

    anime({
      targets: ".my-component .el",
      // translateX: buttonRect.left - position.x,
      // translateY: buttonRect.top - position.y,
      overflow: "hidden",
      minWidth: 0,
      minHeight: 0,
      height: 20,
      width: 45,
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
    // setPosition({ x: data.x, y: data.y });
  };

  const triggerRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current !== null && !isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left - minWidth, y: rect.top });
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

  console.log(triggerRef);

  return (
    <div className="my-component" style={props.wrapperStyles}>
      <button onClick={handleOpen} ref={triggerRef} style={props.triggerStyles}>
        {props.openText || "open"}
      </button>

      {isOpen && (
        <Draggable
          axis="both"
          handle=".handle"
          bounds="body"
          onDrag={handleDrag}
        >
          <Resizable>
            <div
              className="component-container el"
              style={{
                border: "1px solid #ddd",
                resize: "both",
                overflow: "auto",
                transitionTimingFunction: "ease-out",
                left: position.x,
                minWidth: minWidth,
                top: position.y,
              }}
            >
              <div className="handle" style={props.handleStyles}>
                <button onClick={handleClose}>close</button>
              </div>
              <div style={props.contentWrapperStyles}>
                {props.children || "content"}
              </div>
            </div>
          </Resizable>
        </Draggable>
      )}
    </div>
  );
};

export default MyComponent;
