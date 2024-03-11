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
    const dividerWidth = 10; // Width of the divider
    const leftFrameWidth = (canvasWidth - width - dividerWidth) / 2;
    drawSingleOpening(context, leftFrameWidth, height);
    drawSingleOpening(context, leftFrameWidth + dividerWidth, height);
    // Draw divider
    const dividerX = (canvasWidth - dividerWidth) / 2;
    context.fillRect(dividerX, 0, dividerWidth, canvasHeight);
  };

  // Function to draw window frame for triple openings
  const drawTripleOpenings = (context, width, height) => {
    const dividerWidth = 10; // Width of the divider
    const frameWidth = (canvasWidth - 2 * dividerWidth) / 3;
    drawSingleOpening(context, frameWidth, height);
    drawSingleOpening(context, frameWidth + dividerWidth, height);
    drawSingleOpening(context, frameWidth * 2 + dividerWidth * 2, height);
    // Draw dividers
    const dividerX1 = frameWidth;
    const dividerX2 = frameWidth * 2 + dividerWidth;
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
