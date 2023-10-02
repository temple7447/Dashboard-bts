import React, { useState } from 'react';
import './EgliModelITV.css'; // Import the CSS file
import { useInformation } from '../Provider';
import { Alert } from 'flowbite-react';


const EgliModelEBS = () => {
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState(null);
  const {useDistace, setdistance} = useInformation()
  const [alertme, setalertme] = useState(false)
const [alertmesuc, setalertmesuc] = useState(false)



const HandleUsed  = ()=>{
  if(distance.length > 0) {
    const dKm = parseFloat(distance);
    // useDistace, setDistance
    setdistance(dKm)
    setalertmesuc(true)
  }else{
    setalertme(true)

  }
 
}

const handles = () => setalertmesuc(false);
const handlew = () => setalertme(false);


  const calculateLogarithm = () => {
    const Dkm = parseFloat(distance);
    const ht = 228.6; // in meters
    const hr = 1.5; // in meters

    if (!isNaN(Dkm)) {
      const logResult = 40 * Math.log10(Dkm) - 20 * Math.log10(ht) - 10 * Math.log10(hr);
      setResult(logResult);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="egli-model-container"> 
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
      <h2>Egli Model EBS Predition</h2>
      <div className="info-text">Transmission Height = 228.6m and Receiver Height = 1.5</div>
      <label>
        Distance (in kilometers):
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </label>
      <button className="calculate-button my-4 mx-2" onClick={calculateLogarithm} >Calculate</button>
      <div onClick={HandleUsed} style={{backgroundColor:'blue', padding:10, borderRadius:5, }}>Use of distance</div>
      {result !== null && (
        <div className="result-container"> {/* Apply CSS class to the result container */}
          <p>Power(Loss): {result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};




export default EgliModelEBS
