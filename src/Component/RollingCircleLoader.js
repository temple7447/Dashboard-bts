import React from 'react';
import './style.css'; // Import the CSS file for styling

const RollingCircleLoader = () => {
  return (
    <div className="loader-container">
      <div className="rolling-circle-loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default RollingCircleLoader;
