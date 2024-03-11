import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height, openingType }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const windowWidth = width; // Width of the window shape
  const windowHeight = height; // Height of the window shape
  const typeOfWindow = {type_of_window}; // Example value


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw window frame
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;

    // Draw single opening
    if (openingType === 'Single Opening') {
      drawWindow(context, canvasWidth, canvasHeight, windowWidth, windowHeight);
    }
    // Draw two openings
    else if (openingType === 'Two Openings') {
      const dividerWidth = 20; // Width of the divider
      const dividerX = canvasWidth / 2 - dividerWidth / 2; // X coordinate of the divider
      drawWindow(
        context,
        canvasWidth / 2 - dividerWidth / 2,
        canvasHeight,
        windowWidth,
        windowHeight
      );
      drawWindow(
        context,
        canvasWidth / 2 + dividerWidth / 2,
        canvasHeight,
        windowWidth,
        windowHeight
      );
      // Draw divider
      context.fillRect(dividerX, 0, dividerWidth, canvasHeight);
    }
    // Draw triple openings
    else if (openingType === 'Tripple Openings') {
      const dividerWidth = 20; // Width of the divider
      const dividerX1 = canvasWidth / 3 - dividerWidth / 2; // X coordinate of the first divider
      const dividerX2 = (2 * canvasWidth) / 3 - dividerWidth / 2; // X coordinate of the second divider
      drawWindow(
        context,
        canvasWidth / 3 - dividerWidth / 2,
        canvasHeight,
        windowWidth,
        windowHeight
      );
      drawWindow(
        context,
        (2 * canvasWidth) / 3 - dividerWidth / 2,
        canvasHeight,
        windowWidth,
        windowHeight
      );
      // Draw dividers
      context.fillRect(dividerX1, 0, dividerWidth, canvasHeight);
      context.fillRect(dividerX2, 0, dividerWidth, canvasHeight);
    }
  }, [openingType, width, height]);

  // Function to draw window frame
  const drawWindow = (context, startX, canvasHeight, windowWidth, windowHeight) => {
    const frameWidth = 10; // Width of the frame
    const frameX = startX + (windowWidth - width) / 2; // X coordinate of the window
    const frameY = (canvasHeight - windowHeight) / 2; // Y coordinate of the window
    // Draw outer lines of the window
    context.strokeRect(frameX, frameY, windowWidth, windowHeight);
    // Draw inner lines of the window frame
    const innerFrameX = frameX + frameWidth;
    const innerFrameY = frameY + frameWidth;
    const innerFrameWidth = windowWidth - 2 * frameWidth;
    const innerFrameHeight = windowHeight - 2 * frameWidth;
    context.strokeRect(
      innerFrameX,
      innerFrameY,
      innerFrameWidth,
      innerFrameHeight
    );
  };

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