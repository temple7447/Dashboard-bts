import React, { useState } from 'react'
import Textinput from './Textinput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Throughput = () => {

  const [Pd, setPd ] = useState(null);
  const [bandwidth, setbandWidth] = useState(0)
  const [transmitterPower,settransmitterPower] = useState(0)
  const [pathloss, setpathloss] = useState(0)
  const [thermalnoise, setThermalNoise] = useState(0)
  // const [] = useState(0)



// console.log(10/2)

const result = async  ()=>{

  const log2 = Math.log2;

  const signal =  transmitterPower - pathloss

  const reultvalue =  bandwidth *  log2( 1 + signal / thermalnoise )
  if (isNaN(reultvalue)) {
    toast.error('🦄 please all field must be inputed ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  } else {
    setPd(reultvalue);
  }
}

  return (
    <div className="flex max-w-md flex-col gap-4">

    <Textinput final={setbandWidth} initial={bandwidth}  title="Channel Bandwidth (MHZ)" />
    <Textinput final={settransmitterPower} initial={transmitterPower}  title="Transmitter Power" />
    <Textinput final={setpathloss} initial={pathloss}  title="Path Loss at a distance of dm km dBm" />
    <Textinput final={setThermalNoise} initial={thermalnoise}  title="Thermal Noise [watt]" />
 
      <button onClick={result}>click me</button>
      
   
      <ToastContainer/> 
  
   <div>{Pd}</div>
     
    </div>
 )
}

export default Throughput