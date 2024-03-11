import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer lines of the rectangle shape
    const x = (canvasWidth - width) / 2 + borderWidth / 2;
    const y = (canvasHeight - height) / 2 + borderWidth / 2;
    const rectWidth = width - borderWidth;
    const rectHeight = height - borderWidth;
    context.strokeStyle = '#000'; // Black color
    context.lineWidth = borderWidth;
    context.strokeRect(x, y, rectWidth, rectHeight);

    // Draw three evenly spaced rectangles within the outermost one
    const numRectangles = 3;
    const rectangleWidth = (rectWidth - 40) / numRectangles; // Subtracting 40 for spacing
    const startX = (canvasWidth - rectWidth) / 2 + 20; // Start X coordinate
    const startY = (canvasHeight - rectHeight) / 2 + 20; // Start Y coordinate
    for (let i = 0; i < numRectangles; i++) {
      const rectX = startX + i * (rectangleWidth + 20); // Adding 20 for spacing
      context.strokeRect(rectX, startY, rectangleWidth, rectHeight - 40); // Subtracting 40 for spacing

      // Add number to the bottom right corner of each rectangle
      const numberX = rectX + rectangleWidth - 20;
      const numberY = startY + rectHeight - 20;
      context.fillStyle = '#000'; // Black color
      context.font = 'bold 16px Arial';
      context.fillText(i + 1, numberX, numberY);

      // Adjust rectangle dimensions for the numbers
      const rectXAdjusted = rectX + 5;
      const rectWidthAdjusted = rectangleWidth - 10;
      const rectYAdjusted = startY + 5;
      const rectHeightAdjusted = rectHeight - 10;

      // Draw rectangles with adjusted dimensions
      context.strokeRect(rectXAdjusted, rectYAdjusted, rectWidthAdjusted, rectHeightAdjusted);
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

export default CanvasComponent;
