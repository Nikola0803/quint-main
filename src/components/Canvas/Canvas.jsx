import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const windowWidth = width; // Width of the window shape
  const windowHeight = height; // Height of the window shape
  const frameWidth = 10; // Width of the frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw outer frame
    const frameX = (canvasWidth - windowWidth) / 2 - frameWidth; // X coordinate of the window
    const frameY = (canvasHeight - windowHeight) / 2 - frameWidth; // Y coordinate of the window
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = frameWidth;
    context.strokeRect(frameX, frameY, windowWidth + 2 * frameWidth, windowHeight + 2 * frameWidth);
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