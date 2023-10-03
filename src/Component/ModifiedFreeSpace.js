// ModifiedFreeSpace.jsx

import React, { useState } from 'react';
import './ModifiedFreeSpace.css'; // Import the CSS file
import { useInformation } from '../Provider';
import { Alert } from 'flowbite-react';
import Distance from './Distance';


const ModifiedFreeSpace = () => {
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState(null);
  const [alertme, setalertme] = useState(false)
const [alertmesuc, setalertmesuc] = useState(false)
const {useDistace, setdistance} = useInformation() 



  const handles = () => setalertmesuc(false);
  const handlew = () => setalertme(false);


  const calculateFormula = () => {
    const Fmhz = 743.25;
    const d = parseFloat(distance);

    if (!isNaN(d)) {
      const logResult = 31.09 + 20 * Math.log10(Fmhz) + 20 * Math.log10(d);
      setResult(logResult);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="formula-container">
     {alertme  && (
        <Alert
         color="warning"
         onDismiss={handlew}
         >
          <span>
            <p>
              <span className="font-medium">Warning alert!</span>
            The distance field can not  be empty
            </p>
          </span>
        </Alert>
      )}
      {alertmesuc  && (
        <Alert
     color="success"
     onDismiss={handles}
         >
          <span>
            <p>
              <span className="font-medium">Success alert!</span>
            The distance on map has be change to this value {useDistace}m
            </p>
          </span>
        </Alert>
      )}
      <h2>Modified Free Space  Predition</h2>
<div>Frequecy = 743.25Mhz </div>
      <label>
      Distance (in kilometers):
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </label>
      <button className="calculate-button my-4 mx-2" onClick={calculateFormula}>Calculate</button>
<Distance distance={distance} setalertmesuc={setalertmesuc}  />
      {result !== null && (
        <div className="result-container">
          <p>Result: {result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ModifiedFreeSpace;
