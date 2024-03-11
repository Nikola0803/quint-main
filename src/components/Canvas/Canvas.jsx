import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ windowWidth, windowHeight }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 10; // Width of the border
  const dividerWidth = 10; // Width of the dividing lines

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer lines of the window
    const frameX = (canvasWidth - windowWidth) / 2; // X coordinate of the window
    const frameY = (canvasHeight - windowHeight) / 2; // Y coordinate of the window
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;
    context.strokeRect(frameX, frameY, windowWidth, windowHeight);

    // Draw dividing lines
    const dividerX = canvasWidth / 2 - dividerWidth / 2; // X coordinate of the divider
    context.fillRect(dividerX, 0, dividerWidth, canvasHeight);
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