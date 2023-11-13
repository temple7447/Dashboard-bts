import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'flowbite-react';
import { useInformation } from '../../Provider';




const EgliModel = () => {


  const {useDistace, setdistance, globarpathloss, setglobarpathloss} = useInformation()

  const [distance, setDistance] = useState(0);
  const [result, setResult] = useState(null);
const [alertme, setalertme] = useState(false)
const [alertmesuc, setalertmesuc] = useState(false)
const [htvalue,sethtvalue] = useState(0)
const [hrvalue,sethrvalue] = useState(0)

  const HandleUsed  = ()=>{
    if (!isNaN(result)) {
      const dKm = parseFloat(distance);
      // useDistace, setDistance
      setglobarpathloss(result)
      setalertmesuc(true)
    }else{
      setalertme(true)

    }
   
  }


  const handles = () => setalertmesuc(false);
  const handlew = () => setalertme(false);

  const calculateHataPathLoss = () => {
    const log10 = Math.log10;
    const dKm = parseFloat(distance);
    const ht = parseFloat(htvalue)
    const hr = parseFloat(hrvalue)

    if (!isNaN(dKm) && !isNaN(ht) && !isNaN(hr)) {
      const pathLoss = 40 * log10(dKm) - 20 * log10(ht) - 10 * log10(hr)
       

      setResult(pathLoss);
    } else {
      setResult('Please enter valid input for all fields.');
    }
  };

  return (
    <div className="hata-container">
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
      <h1>Egli Model Losses Calculator</h1>
      <form className="form-container">
        <div className="form-group flex flex-row items-center">
          <label>Link Distance (km):</label>
          <input
           type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={{width:100}}
          />
        </div>
        <div className="form-group flex flex-row items-center">
          <label>Height of Receiver(km):</label>
          <input
           type="number"
            value={hrvalue}
            onChange={(e) => sethrvalue(e.target.value)}
            style={{width:100}}
          />
        </div>
        <div className="form-group flex flex-row items-center">
          <label>Height of Transmitter(km):</label>
          <input
           type="number"
            value={htvalue}
            onChange={(e) => sethtvalue(e.target.value)}
            style={{width:100}}
          />
        </div>
      
        <button className="calculate-button my-4" type="button" onClick={calculateHataPathLoss}>
          Calculate
        </button>
        <div onClick={HandleUsed} style={{backgroundColor:'blue', padding:10, borderRadius:5, }}>Use of pathloss</div>
      </form>
      <div className='' style={{display:'flex'}}>
      {result !== null &&  <div className="result">PL_Hata(dB): {result}</div>}

      </div>
    </div>
  );
};









export default EgliModel