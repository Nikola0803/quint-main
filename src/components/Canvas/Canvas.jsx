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
    const frameHeight = canvasHeight; // Height of the frame
    const frameSpacing = 20; // Spacing between frames
    const totalFrameWidth = windowWidth + 2 * frameWidth + frameSpacing;

    // Calculate X coordinate for the left frame
    const leftFrameX = (canvasWidth - totalFrameWidth) / 2;

    // Draw left frame
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;
    context.strokeRect(leftFrameX, 0, frameWidth, frameHeight);

    // Calculate X coordinate for the middle frame
    const middleFrameX = leftFrameX + frameWidth + frameSpacing;

    // Draw middle frame
    context.strokeRect(middleFrameX, 0, windowWidth, frameHeight);

    // Calculate X coordinate for the right frame
    const rightFrameX = middleFrameX + windowWidth + frameSpacing;

    // Draw right frame
    context.strokeRect(rightFrameX, 0, frameWidth, frameHeight);

    // Draw inner lines of the window frames
    const innerFrameWidth = windowWidth - 2 * frameWidth;
    const innerFrameX = middleFrameX + frameWidth;
    context.strokeRect(innerFrameX, 0, innerFrameWidth, frameHeight);
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
