import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
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

    // Draw outer lines of the window
    const frameWidth = 10; // Width of the frame
    const frameX = (canvasWidth - windowWidth) / 2 + frameWidth / 2; // X coordinate of the window
    const frameY = (canvasHeight - windowHeight) / 2 + frameWidth / 2; // Y coordinate of the window
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;
    context.strokeRect(frameX, frameY, windowWidth - frameWidth, windowHeight - frameWidth);

    // Draw inner lines of the window frame
    const frameMiddleX1 = frameX + windowWidth / 3; // X coordinate of the first middle line
    const frameMiddleX2 = frameX + (2 * windowWidth) / 3; // X coordinate of the second middle line
    const frameMiddleWidth = frameWidth; // Width of the middle line
    context.strokeRect(
      frameMiddleX1 - frameWidth / 2,
      frameY,
      frameMiddleWidth,
      windowHeight - frameWidth
    );
    context.strokeRect(
      frameMiddleX2 - frameWidth / 2,
      frameY,
      frameMiddleWidth,
      windowHeight - frameWidth
    );
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
