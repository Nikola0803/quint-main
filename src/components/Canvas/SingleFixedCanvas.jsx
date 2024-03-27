import React, { useRef, useEffect } from 'react';

const SingleFixedCanvasComponent = ({ width, height, width1 }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
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
  
    // Draw inner lines of the rectangle shape
    const innerX = outerX + spacing; // Adjusted X position for inner rectangle
    const innerY = outerY + spacing; // Adjusted Y position for inner rectangle
    const innerWidth = outerWidth - 2 * spacing; // Adjusted width for inner rectangle
    const innerHeight = outerHeight - 2 * spacing; // Adjusted height for inner rectangle
    context.strokeStyle = '#000'; // Black color
    context.lineWidth = borderWidth;
    context.strokeRect(innerX, innerY, innerWidth, innerHeight);

    // Draw additional rectangular shape inside width1
    if (width1) {
      const innerRectWidth = innerWidth - 20; // 10 pixels smaller on each side
      const innerRectX = innerX + 10; // 10 pixels offset from the outer rectangle
      context.strokeRect(innerRectX, innerY + 10, innerRectWidth, innerHeight - 20); // Adjusted height for inner rectangle
    }
  
    // Add number to the bottom right corner of the inner rectangle
    const numberX = innerX + innerWidth - 15;
    const numberY = innerY + innerHeight - 15;
    context.fillStyle = '#000'; // Black color
    context.font = 'bold 16px Arial';
    context.fillText('1', numberX, numberY); // Write number 1 for the single inner rectangle
  }, [width, height, width1]);
  

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '1px solid black' }}
    />
  );
};

export default SingleFixedCanvasComponent;
