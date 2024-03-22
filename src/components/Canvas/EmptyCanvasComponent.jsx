import React from 'react';

const EmptyCanvasComponent = ({ canvasWidth, canvasHeight }) => {
  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '1px solid black' }}
    />
  );
};

export default EmptyCanvasComponent;
