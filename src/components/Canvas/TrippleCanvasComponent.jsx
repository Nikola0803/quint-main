import React, { useRef, useEffect } from 'react';

const TrippleCanvasComponent = ({ width, height, fixedDistribution, width1, width2, width3, setWidth1, setWidth2, setWidth3 }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
  const spacing = 10; // Adjusted spacing between rectangles

  // Function to calculate the widths of the rectangles based on fixed distribution
  const calculateRectWidths = () => {
    if (fixedDistribution === '1:1:1') {
      return [width / 3, width / 3, width / 3];
    } else if (fixedDistribution === '1:2:1') {
      const middleWidth = (width * 3) / 7; // Adjusted the middle width to be larger
      const sideWidth = (width - middleWidth) / 2;
      return [sideWidth, middleWidth, sideWidth];
    } else {
      // Handle unexpected fixedDistribution values
      console.error('Unexpected fixedDistribution value:', fixedDistribution);
      // Return some default widths or throw an error
      // For now, let's return equal widths as a fallback
      return [width / 3, width / 3, width / 3];
    }
  };  

  // Function to convert millimeters to pixels
  const mmToPx = (mm) => {
    return mm / 10; // Divide by 10 to convert from millimeters to pixels
  };

  // Function to calculate the total length of lines in the shapes
  const calculateTotalLineLength = (rectWidths) => {
    let totalLength = 0;

    // Iterate through each rectangle
    for (let i = 0; i < rectWidths.length; i++) {
      const rectWidth = rectWidths[i];
      const rectHeight = height;

      // Calculate the length of horizontal lines
      const horizontalLength = rectWidth * 2 + rectHeight * 2;

      // Calculate the length of vertical lines
      const verticalLength = rectHeight;

      // Add the lengths of horizontal and vertical lines
      totalLength += horizontalLength + verticalLength;
    }

    return totalLength;
  };

  // Effect to draw on the canvas when dimensions or fixedDistribution change
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate the width and height of the outer shape
    const outerRectWidth = width + 2 * spacing + 2 * borderWidth + 20; // Add 20 pixels for the additional space
    const outerRectHeight = height + 2 * spacing + 2 * borderWidth;

    // Draw outer lines of the rectangle shape
    const outerRectX = (canvasWidth - outerRectWidth) / 2;
    const outerRectY = (canvasHeight - outerRectHeight) / 2;
    context.strokeStyle = '#000'; // Black color
    context.lineWidth = borderWidth;
    context.strokeRect(outerRectX, outerRectY, outerRectWidth, outerRectHeight);

    // Draw the rectangles based on the calculated widths or manual inputs
    let startX = outerRectX + spacing + borderWidth; // Start X coordinate
    const startY = outerRectY + spacing + borderWidth; // Start Y coordinate
    const rectWidths = fixedDistribution === 'Manual' ? [mmToPx(width1), mmToPx(width2), mmToPx(width3)] : calculateRectWidths();
    for (let i = 0; i < rectWidths.length; i++) {
      const rectX = startX;
      const rectWidth = rectWidths[i];
      context.strokeRect(rectX, startY, rectWidth, height); // Height is the same for all rectangles

      // Draw additional rectangular shape inside width1 and width3
      if ((i === 0 || i === 2)) {
        const innerRectWidth = rectWidth - 20; // 10 pixels smaller on each side
        const innerRectX = rectX + 10; // 10 pixels offset from the outer rectangle
        context.strokeRect(innerRectX, startY + 10, innerRectWidth, height - 20); // Adjusted height for inner rectangle
      }

      startX += rectWidth + spacing; // Adjust startX for the next rectangle
    }

    // Calculate and log the total length of all lines in the shapes
    const totalLineLength = calculateTotalLineLength(rectWidths);
    console.log('Total length of all lines:', totalLineLength);
  }, [width, height, fixedDistribution, width1, width2, width3]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid black' }}
      />
      {fixedDistribution === 'Manual' && (
        <>
          <div className="option">
            <label htmlFor="width1">Width of section 1 (in mm):</label>
            <input type="number" id="width1" value={width1} onChange={(e) => setWidth1(e.target.value)} />
          </div>
          <div className="option">
            <label htmlFor="width2">Width of section 2 (in mm):</label>
            <input type="number" id="width2" value={width2} onChange={(e) => setWidth2(e.target.value)} />
          </div>
          <div className="option">
            <label htmlFor="width3">Width of section 3 (in mm):</label>
            <input type="number" id="width3" value={width3} onChange={(e) => setWidth3(e.target.value)} />
          </div>
        </>
      )}
    </>
  );
};

export default TrippleCanvasComponent;