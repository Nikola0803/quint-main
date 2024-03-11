import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const windowWidth = width; // Width of the window shape
  const windowHeight = height; // Height of the window shape
  const frameWidth = 10; // Width of the frame
  const numDividers = 3; // Number of dividing lines
  const dividerWidth = 10; // Width of the dividing lines

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate spacing between dividing lines
    const spacing = (windowWidth - (numDividers - 1) * dividerWidth) / numDividers;

    // Draw outer lines of the window
    const frameX = (canvasWidth - windowWidth) / 2 + frameWidth / 2; // X coordinate of the window
    const frameY = (canvasHeight - windowHeight) / 2 + frameWidth / 2; // Y coordinate of the window
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;
    context.strokeRect(frameX, frameY, windowWidth - frameWidth, windowHeight - frameWidth);

    // Draw dividing lines
    for (let i = 0; i < numDividers; i++) {
      const dividerX = frameX + i * (spacing + dividerWidth); // X coordinate of the divider
      context.strokeRect(dividerX, frameY, dividerWidth, windowHeight - frameWidth);
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
