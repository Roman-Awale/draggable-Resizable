import React, { useEffect, useState } from "react";

const DragResize = () => {
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    } else {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [dragging]);

  const mouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  const mouseMove = (e) => {
    if (!dragging) return;
    const maxX = window.innerWidth - e.target.offsetWidth;
    const maxY = window.innerHeight - e.target.offsetHeight;
    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    setPosition({ x: newX, y: newY });
  };

  const mouseUp = (e) => {
    setDragging(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Open</button>
      {visible && (
        <div
          style={{
            width: "400px",
            height: "300px",
            border: "1px solid black",
            left: `${position.x}px`,
            top: `${position.y}px`,
            position: "absolute",
            cursor: "move",
          }}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
        >
          <div className="drag-handle">
            <button onClick={handleClose}>Close</button>
          </div>

          <div className="resizable-btn"></div>
        </div>
      )}
    </div>
  );
};

export default DragResize;
