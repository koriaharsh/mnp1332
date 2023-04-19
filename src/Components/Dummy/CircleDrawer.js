import React, { useState, useRef, useEffect } from "react";

function CanvasCircle() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(startPos.x, startPos.y, getRadius(), 0, 2 * Math.PI);
    context.stroke();
  }, [startPos, endPos]);

  function handleMouseDown(event) {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setStartPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  function handleMouseUp(event) {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setEndPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  function handleMouseMove(event) {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setEndPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  function getRadius() {
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ border: "1px solid black", marginTop: "20px" }}
      width={1000}
      height={500}
    />
  );
}

export default CanvasCircle;
