import React, { useRef, useEffect } from 'react';

const TwoPartCanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
  const numRectangles = 2; // Number of rectangles
  const spacing = 10; // Adjusted spacing between rectangles

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer lines of the rectangle shape
    const outerX = (canvasWidth - width) / 2 - 8; // Adjusted left position
    const outerY = (canvasHeight - height) / 2 + borderWidth / 2 - 5 - 10; // Adjusted top position with additional 10px
    const outerWidth = width + 16 + 10; // Adjusted width with extra spacing on the right
    const outerHeight = height + 20 - borderWidth + 10 + 10; // Adjusted height with extra spacing on top and bottom
    context.strokeStyle = '#000'; // Black color
    context.lineWidth = borderWidth;
    context.strokeRect(outerX, outerY, outerWidth, outerHeight);

    // Draw two evenly spaced rectangles within the outermost one
    const rectangleWidth = (width - spacing) / numRectangles; // Adjusted for spacing
    const startX = (canvasWidth - width) / 2 + spacing / 2; // Start X coordinate
    const startY = (canvasHeight - height) / 2 + spacing / 2 - 5; // Adjusted top position with extra spacing
    for (let i = 0; i < numRectangles; i++) {
      const rectX = startX + i * (rectangleWidth + spacing); // Adding spacing
      context.strokeRect(rectX, startY, rectangleWidth, height + 20 - spacing); // Adjusted height with extra spacing

      // Add number to the bottom right corner of each rectangle
      const numberX = rectX + rectangleWidth - 15;
      const numberY = startY + height + 20 - spacing - 15; // Adjusted Y position with extra spacing
      context.fillStyle = '#000'; // Black color
      context.font = 'bold 16px Arial';
      context.fillText(i + 1, numberX, numberY);
    }
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

export default TwoPartCanvasComponent;
