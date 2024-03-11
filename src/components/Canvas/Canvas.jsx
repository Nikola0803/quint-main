import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ width, height, openingType }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw canvas frame
    context.fillStyle = '#fff'; // White background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw window frame based on opening type
    context.strokeStyle = '#000'; // Black lines
    context.lineWidth = 2;

    if (openingType === 'Single Opening') {
      drawSingleOpening(context, width, height);
    } else if (openingType === 'Two Openings') {
      drawTwoOpenings(context, width, height);
    } else if (openingType === 'Tripple Openings') {
      drawTripleOpenings(context, width, height);
    }
  }, [openingType, width, height]);

  // Function to draw window frame for single opening
  const drawSingleOpening = (context, width, height) => {
    const frameWidth = 10; // Width of the frame
    const frameX = (canvasWidth - width) / 2; // X coordinate of the window
    const frameY = (canvasHeight - height) / 2; // Y coordinate of the window
    // Draw outer lines of the window
    context.strokeRect(frameX, frameY, width, height);
    // Draw inner lines of the window frame
    const innerFrameX = frameX + frameWidth;
    const innerFrameY = frameY + frameWidth;
    const innerFrameWidth = width - 2 * frameWidth;
    const innerFrameHeight = height - 2 * frameWidth;
    context.strokeRect(
      innerFrameX,
      innerFrameY,
      innerFrameWidth,
      innerFrameHeight
    );
  };

  // Function to draw window frame for two openings
  const drawTwoOpenings = (context, width, height) => {
    const dividerWidth = (canvasWidth - width) / 2; // Width of the divider
    const dividerX = canvasWidth / 2 - dividerWidth / 2; // X coordinate of the divider
    drawSingleOpening(context, width, height);
    // Draw divider
    context.fillRect(dividerX, 0, dividerWidth, canvasHeight);
  };

  // Function to draw window frame for triple openings
  const drawTripleOpenings = (context, width, height) => {
    const dividerWidth = (canvasWidth - width) / 3; // Width of the divider
    const dividerX1 = canvasWidth / 3 - dividerWidth / 2; // X coordinate of the first divider
    const dividerX2 = (2 * canvasWidth) / 3 - dividerWidth / 2; // X coordinate of the second divider
    drawSingleOpening(context, width, height);
    // Draw dividers
    context.fillRect(dividerX1, 0, dividerWidth, canvasHeight);
    context.fillRect(dividerX2, 0, dividerWidth, canvasHeight);
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