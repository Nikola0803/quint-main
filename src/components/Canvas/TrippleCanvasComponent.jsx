import React, { useRef, useEffect, useState } from 'react';

const TrippleCanvasComponent = ({ width, height, fixedDistribution, width1, width2, width3, errorStringWidth }) => {
  const canvasRef = useRef(null);
  const manualWidth1Ref = useRef(null);
  const manualWidth2Ref = useRef(null);
  const manualWidth3Ref = useRef(null);
  const [scaledWidths, setScaledWidths] = useState([width / 3, width / 3, width / 3]);

  const canvasWidth = 700; // Width of the canvas frame
  const canvasHeight = 500; // Height of the canvas frame
  const borderWidth = 1; // Width of the border
  const spacing = 10; // Adjusted spacing between rectangles

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!errorStringWidth) {
      // Function to calculate the widths of the rectangles based on fixed distribution
      const calculateRectWidths = () => {
        if (fixedDistribution === '1:1:1') {
          return [scaledWidths[0], scaledWidths[1], scaledWidths[2]];
        } else if (fixedDistribution === '1:2:1') {
          const middleWidth = (scaledWidths[0] + scaledWidths[2]) / 2; // Adjusted the middle width to be larger
          return [scaledWidths[0], middleWidth, scaledWidths[2]];
        } else if (fixedDistribution === 'Manual') {
          return scaledWidths;
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

      // Calculate the width and height of the outer shape
      const outerRectWidth = scaledWidths.reduce((acc, cur) => acc + cur, 2 * spacing + 2 * borderWidth + 20);
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
      const rectWidths = calculateRectWidths();
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
    } else {
      // Draw empty canvas with border if there's an error
      context.strokeRect(0, 0, canvasWidth, canvasHeight);
    }
  }, [width, height, fixedDistribution, scaledWidths, errorStringWidth]);

  // Update scaled widths when manual inputs change
  useEffect(() => {
    setScaledWidths([
      parseInt(manualWidth1Ref.current.value) * 10,
      parseInt(manualWidth2Ref.current.value) * 10,
      parseInt(manualWidth3Ref.current.value) * 10
    ]);
  }, [manualWidth1Ref.current.value, manualWidth2Ref.current.value, manualWidth3Ref.current.value]);

  return (
    <div>
      <div>
        <label>Width 1 (cm): </label>
        <input ref={manualWidth1Ref} type="number" defaultValue={width1} />
      </div>
      <div>
        <label>Width 2 (cm): </label>
        <input ref={manualWidth2Ref} type="number" defaultValue={width2} />
      </div>
      <div>
        <label>Width 3 (cm): </label>
        <input ref={manualWidth3Ref} type="number" defaultValue={width3} />
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default TrippleCanvasComponent;
