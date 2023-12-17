
import React from 'react';
import "./Progress.scss";

export const ProgressBarDifferentColour = ({currentValue, maxValue}) => 
  <progress 
  className="progressBar"
  value={currentValue} 
  max={maxValue}
  >
    {currentValue}%
  </progress>