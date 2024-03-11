import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
  const numRectangles = 1; // Number of rectangles
  const spacing = 10; // Adjusted spacing between rectangles

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer lines of the rectangle shape
    const outerX = (canvasWidth - width) / 2 + borderWidth / 2 + spacing; // Adjusted X position with spacing
    const outerY = (canvasHeight - height) / 2 + borderWidth / 2 + spacing; // Adjusted Y position with spacing
    const outerWidth = width - 2 * spacing - borderWidth; // Adjusted width with spacing
    const outerHeight = height - 2 * spacing - borderWidth; // Adjusted height with spacing
    context.strokeStyle = '#000'; // Black color
    context.lineWidth = borderWidth;
    context.strokeRect(outerX, outerY, outerWidth, outerHeight);

    // Draw one rectangle inside the outermost one
    const rectangleWidth = outerWidth - 2 * spacing; // Adjusted width with spacing
    const startX = outerX + spacing; // Start X coordinate
    const startY = outerY + spacing; // Start Y coordinate
    const rectX = startX; // X coordinate of the inner rectangle
    const rectY = startY; // Y coordinate of the inner rectangle
    const rectWidth = rectangleWidth; // Width of the inner rectangle
    const rectHeight = outerHeight - 2 * spacing; // Adjusted height of the inner rectangle
    context.strokeRect(rectX, rectY, rectWidth, rectHeight); // Draw inner rectangle

    // Add number to the bottom right corner of the inner rectangle
    const numberX = rectX + rectWidth - 15;
    const numberY = rectY + rectHeight - 15;
    context.fillStyle = '#000'; // Black color
    context.font = 'bold 16px Arial';
    context.fillText('1', numberX, numberY); // Write number 1 for the single inner rectangle
  }, [width, height]);

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