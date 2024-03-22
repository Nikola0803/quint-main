import React from 'react';

const EmptyCanvasComponent = ({ canvasWidth, canvasHeight }) => {
    const canvasWidth = 700; // Width of the canvas frame
    const canvasHeight = 500; // Height of the canvas frame
  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '1px solid black' }}
    />
  );
};

export default EmptyCanvasComponent;
