import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MyComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [minWidth, setminWidth] = useState(200);
  const [minHeight, setMinHeight] = useState(200);
  const [triggerBtnHeight, setTriggerBtnHeight] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    const buttonRect = triggerRef.current.getBoundingClientRect();
    const containerRect = containerRef.current;
    const transformValue = containerRect.style.transform;
    var translateX = 0;
    var translateY = 0;

    var translateMatch = transformValue.match(/translate\(([^,]+),([^)]+)\)/);
    if (translateMatch) {
      translateX = parseFloat(translateMatch[1]);
      translateY = parseFloat(translateMatch[2]);
    }
    console.log(translateX, translateY);

    anime({
      targets: ".my-component .el",
      translateX: -translateX,
      translateY: -translateY,
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
    console.log(buttonRect);
  };

  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current !== null && !isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.bottom,
      });
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

  useEffect(() => {
    const buttonRect = triggerRef.current.getBoundingClientRect();
    setTriggerBtnHeight(buttonRect.height);
  }, []);

  return (
    <div className="my-component" style={props.wrapperStyles}>
      <button
        onClick={handleOpen}
        ref={triggerRef}
        style={props.triggerStyles}
        className="open-btn"
      >
        {props.openText || "open"}
      </button>

      {isOpen && (
        <Draggable
          axis="both"
          handle=".handle"
          bounds="body"
          defaultPosition={{ x: -minWidth, y: -triggerBtnHeight }}
        >
          <Resizable>
            <div
              className="component-container el "
              id="myDiv"
              ref={containerRef}
              style={{
                border: "1px solid #ddd",
                resize: "both",
                overflow: "auto",
                transitionTimingFunction: "ease-out",
                left: position.x,
                minWidth: minWidth,
                minHeight: minHeight,
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
