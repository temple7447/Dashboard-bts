import React, { useState, useContext, useEffect } from 'react';
import './stylyinghata.css'; // Import your CSS file
import { useInformation } from '../hooks/useInformation';
import { Alert } from 'flowbite-react';

const HataStv = () => {
  const { useDistace, setdistance, setglobarpathloss, setMute } =
    useInformation();

  const [distance, setDistance] = useState('');
  const [result, setResult] = useState(null);
  const [alertme, setalertme] = useState(false);
  const [alertmesuc, setalertmesuc] = useState(false);

  const HandleUsed = () => {
    if (distance.length > 0) {
      const dKm = parseFloat(distance);
      // useDistace, setDistance
      setdistance(dKm);
      setalertmesuc(true);
    } else {
      setalertme(true);
    }
  };

  const handles = () => setalertmesuc(false);
  const handlew = () => setalertme(false);

  const calculateHataPathLoss = () => {
    const log10 = Math.log10;
    const fMHz = 583.25;
    const ht = 76.2;
    const hr = 1.5;
    const dKm = parseFloat(distance);

    if (!isNaN(dKm)) {
      const aHr = 3.2;
      const pathLoss =
        68.85 +
        26.16 * log10(fMHz) -
        13.82 * log10(ht) -
        aHr * log10(11.75 * hr) * log10(11.75 * hr) -
        4.97 +
        (44.9 - 6.55 * log10(ht)) * log10(dKm);

      setResult(pathLoss);
      setglobarpathloss(pathLoss);
      setMute(false);
    } else {
      setResult('Please enter valid input for all fields.');
    }
  };

  return (
    <div className="hata-container">
      {alertme && (
        <Alert color="warning" onDismiss={handlew}>
          <span>
            <p>
              <span className="font-medium">Warning alert!</span>
              The distance field can not be empty
            </p>
          </span>
        </Alert>
      )}
      {alertmesuc && (
        <Alert color="success" onDismiss={handles}>
          <span>
            <p>
              <span className="font-medium">Success alert!</span>
              The distance on map has be change to this value {useDistace}m
            </p>
          </span>
        </Alert>
      )}
      <h1>Hata Path Loss Calculator</h1>
      <div className="info-text">
        Transmitter Height = 76.2m, Receiver Height = 1.5 and Frequecy =
        583.25Mhz;
      </div>
      <form className="form-container">
        <div className="form-group">
          <label>Link Distance (km):</label>
          <input
            type="number"
            value={distance}
            onChange={e => setDistance(e.target.value)}
          />
        </div>
        <button
          className="calculate-button my-4"
          type="button"
          onClick={calculateHataPathLoss}
        >
          Calculate
        </button>
        <div
          onClick={HandleUsed}
          style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
        >
          Use of distance
        </div>
      </form>
      <div className="" style={{ display: 'flex' }}>
        {result !== null && <div className="result">PL_Hata(dB): {result}</div>}
      </div>
    </div>
  );
};

export default HataStv;
