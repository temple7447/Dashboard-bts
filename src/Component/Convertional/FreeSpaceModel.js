import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'flowbite-react';
import { useInformation } from '../../Provider';




const FreeSpaceModel = () => {


  const {useDistace, setdistance,globarpathloss, setglobarpathloss, setMute} = useInformation()

  const [distance, setDistance] = useState(0);
  const [result, setResult] = useState(null);
const [alertme, setalertme] = useState(false)
const [alertmesuc, setalertmesuc] = useState(false)
const [frequency,setfrequency] = useState(0)




const HandleUsed  = ()=>{
  if (result !== null) {
 
    setglobarpathloss(result)
    setalertmesuc(true)
    setMute(false)
  }else{
    setalertme(true)
    setMute(true)
  }
 
}

  const handles = () => setalertmesuc(false);
  const handlew = () => setalertme(false);

  const calculateHataPathLoss = () => {
    const log10 = Math.log10;
    const dKm = parseFloat(distance);

    const fMz = parseFloat(frequency)
  

    if (!isNaN(dKm ) && !isNaN(fMz)) {
      const pathLoss = 32.44 + 20 * log10(fMz) + 20 * log10(dKm)
       

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
              This pathloss can now be used 
            </p>
          </span>
        </Alert>
      )}
      <h1>Free Space Model Losses Calculator</h1>
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
          <label>Frequency F(Mhz):</label>
          <input
           type="number"
            value={frequency}
            onChange={(e) => setfrequency(e.target.value)}
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






export default FreeSpaceModel
