import React, { useState } from 'react'
import Textinput from './Textinput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInformation } from '../../Provider';

const Throughput = () => {

  const [Pd, setPd ] = useState(null);

  const [transmitterPower,settransmitterPower] = useState(0)
  const [thermalnoise, setThermalNoise] = useState(0)
  const { globarpathloss, setglobarpathloss,setglobelthroughtput, globelthroughtput } = useInformation()


// console.log(10/2)

const result = async  ()=>{

  const log2 = Math.log2;

  const signal =  transmitterPower - globarpathloss

  const reultvalue =  6 *  log2( 1 + signal / thermalnoise )
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
    setglobelthroughtput(reultvalue)
  }
}

  return (
    <div className="flex max-w-md flex-col gap-4">

    <Textinput final={settransmitterPower} initial={transmitterPower}  title="Transmitter Power" />
    <Textinput final={setglobarpathloss} initial={globarpathloss}  title="Path Loss at a distance of dm km dBm" />
    <Textinput final={setThermalNoise} initial={thermalnoise}  title="Thermal Noise [watt]" />
 
      <button onClick={result}>Through put</button>
      
   
      <ToastContainer/> 
  
   <div>{Pd}</div>
     
    </div>
 )
}

export default Throughput