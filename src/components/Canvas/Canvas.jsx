import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const borderWidth = 10; // Width of the border
  const divisionWidth = 10; // Width of the dividing lines

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer frame
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = borderWidth;
    context.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

    // Draw dividing lines
    const numberOfDivisions = 3; // Number of divisions
    context.lineWidth = divisionWidth;
    for (let i = 1; i < numberOfDivisions; i++) {
      const divisionX = (width / numberOfDivisions) * i;
      context.beginPath();
      context.moveTo(divisionX, 0);
      context.lineTo(divisionX, height);
      context.stroke();
    }
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    />
  );
};

export default CanvasComponent;
