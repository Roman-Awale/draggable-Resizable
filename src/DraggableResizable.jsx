import React, { useState, useRef, useEffect } from "react";

const DraggableResizable = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 200 }); // Initial size
  const buttonRef = useRef();

  useEffect(() => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    // Ensure initial position is within the viewport
    const initialX = Math.min(
      buttonRect.right + 10,
      innerWidth - buttonRect.width
    );
    const initialY = Math.min(buttonRect.top, innerHeight - buttonRect.height);

    setPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      e.preventDefault();
      if (dragging) {
        const offsetX = e.clientX - startPosition.x;
        const offsetY = e.clientY - startPosition.y;

        const newX = position.x + offsetX;
        const newY = position.y + offsetY;

        const { innerWidth, innerHeight } = window;
        const newPosX = Math.min(Math.max(0, newX), innerWidth - size.width);
        const newPosY = Math.min(Math.max(0, newY), innerHeight - size.height);

        setPosition({ x: newPosX, y: newPosY });
        setStartPosition({ x: e.clientX, y: e.clientY });
      } else if (resizing) {
        const offsetX = e.clientX - startPosition.x;
        const offsetY = e.clientY - startPosition.y;

        const newWidth = Math.max(100, size.width + offsetX); // Minimum width
        const newHeight = Math.max(100, size.height + offsetY); // Minimum height

        setSize({ width: newWidth, height: newHeight });
        setStartPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }

      if (resizing) {
        setResizing(false);
      }
    };

    if (dragging || resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, resizing, position, size, startPosition]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const headerHeight = 40; // Adjust this value according to your header height
    const isHeaderClicked =
      e.target.classList.contains("drag-handle") &&
      e.clientY - position.y < headerHeight;

    if (isHeaderClicked) {
      setDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    } else if (e.target.classList.contains("resize-handle")) {
      setResizing(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      // Ensure initial position is within the viewport
      const initialX = Math.min(
        buttonRect.right - 20,
        innerWidth - buttonRect.width
      );
      const initialY = Math.min(
        buttonRect.top + 10,
        innerHeight - buttonRect.height
      );

      setPosition({ x: initialX, y: initialY });
    }, 0); // Transition duration for closing
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={handleOpen}>
        Open
      </button>
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          border: "1px solid #ccc",
          background: "white",
          transition:
            dragging || resizing
              ? "none"
              : "all 0.9s ease, transform 0.3s ease-out 0.5s", // Add different transition durations
          transformOrigin: "top left",
          transform: `scale(${visible ? 1 : 0})`,
          // opacity: visible ? 1 : 0,
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="drag-handle"
          style={{
            width: "100%",
            height: "40px", // Adjust this value according to your header height
            display: "flex",
            justifyContent: "flex-end",
            cursor: "grab",
            background: "lightblue",
          }}
        >
          {/* Close button inside the component */}
          <button onClick={handleClose} style={{ margin: "4px" }}>
            Close
          </button>
        </div>

        <div
          className="resize-handle"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            cursor: "nwse-resize",
            resize: "both",
            overflow: "auto",
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default DraggableResizable;
