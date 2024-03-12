import React, { useRef, useEffect, useState } from 'react';

const TrippleCanvasComponent = ({ width, height, fixedDistribution }) => {
  const canvasRef = useRef(null);
  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
  const numRectangles = 3; // Number of rectangles
  const spacing = 10; // Adjusted spacing between rectangles

  const [widths, setWidths] = useState({
    width1: width / 3,
    width2: width / 3,
    width3: width / 3,
  });

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
    const rectWidths = fixedDistribution === 'Manual' ? Object.values(widths) : calculateRectWidths();
    for (let i = 0; i < numRectangles; i++) {
      const rectX = startX;
      const rectWidth = rectWidths[i];
      context.strokeRect(rectX, startY, rectWidth, height); // Height is the same for all rectangles
      startX += rectWidth + spacing; // Adjust startX for the next rectangle
    }
  }, [width, height, fixedDistribution, widths]);

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

  const handleWidthChange = (event, key) => {
    const newValue = parseInt(event.target.value);
    setWidths(prevWidths => ({ ...prevWidths, [key]: newValue }));
  };

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
            <input type="number" id="width1" value={widths.width1} onChange={(e) => handleWidthChange(e, 'width1')} />
          </div>
          <div className="option">
            <label htmlFor="width2">Width of section 2 (in mm):</label>
            <input type="number" id="width2" value={widths.width2} onChange={(e) => handleWidthChange(e, 'width2')} />
          </div>
          <div className="option">
            <label htmlFor="width3">Width of section 3 (in mm):</label>
            <input type="number" id="width3" value={widths.width3} onChange={(e) => handleWidthChange(e, 'width3')} />
          </div>
        </>
      )}
    </>
  );
};

export default TrippleCanvasComponent;