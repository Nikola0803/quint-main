import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ windowWidth, windowHeight }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 10; // Width of the border
  const divisionWidth = 10; // Width of the dividing lines
  const windowWidth = width; // Width of the window shape
  const windowHeight = height; // Height of the window shape

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer frame
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = borderWidth;
    context.strokeRect(borderWidth / 2, borderWidth / 2, windowWidth - borderWidth, windowHeight - borderWidth);

    // Draw dividing lines
    const numberOfDivisions = 3; // Number of divisions
    context.lineWidth = divisionWidth;
    const divisionSpacing = (windowWidth - 2 * borderWidth) / (numberOfDivisions + 1);
    for (let i = 1; i <= numberOfDivisions; i++) {
      const divisionX = borderWidth + divisionSpacing * i;
      context.beginPath();
      context.moveTo(divisionX, borderWidth);
      context.lineTo(divisionX, windowHeight - borderWidth);
      context.stroke();
    }
  }, [windowWidth, windowHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '1px solid black' }}
    />
  );
};

export default CanvasComponent;
