import React, { useState } from 'react';

function HataPathLossCalculator() {
  const [frequency, setFrequency] = useState('');
  const [baseStationHeight, setBaseStationHeight] = useState('');
  const [mobileAntennaHeight, setMobileAntennaHeight] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState(null);

  const calculateHataPathLoss = () => {
    const log10 = Math.log10;
    const fMHz = parseFloat(frequency);
    const ht = parseFloat(baseStationHeight);
    const hr = parseFloat(mobileAntennaHeight);
    const dKm = parseFloat(distance);

    if (!isNaN(fMHz) && !isNaN(ht) && !isNaN(hr) && !isNaN(dKm)) {
      const aHr = 3.2;
      const pathLoss =
        69.55 +
        26.16 * log10(fMHz) -
        13.82 * log10(ht - aHr * hr) +
        (44.9 - 6.55 * log10(ht)) * log10(dKm);

      setResult(pathLoss);
    } else {
      setResult('Please enter valid input for all fields.');
    }
  };

  return (
    <div>
      <h1>Hata Path Loss Calculator</h1>
      <form>
        <div>
          <label>Frequency (MHz):</label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
        <div>
          <label>Base Station Height (m):</label>
          <input
            type="text"
            value={baseStationHeight}
            onChange={(e) => setBaseStationHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Mobile Antenna Height (m):</label>
          <input
            type="text"
            value={mobileAntennaHeight}
            onChange={(e) => setMobileAntennaHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Link Distance (km):</label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <button type="button" onClick={calculateHataPathLoss}>
          Calculate
        </button>
      </form>
      {result !== null && <div>PL_Hata(dB): {result}</div>}
    </div>
  );
}

export default HataPathLossCalculator;
