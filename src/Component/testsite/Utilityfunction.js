import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Textinput from './Textinput';


const Utilityfunction = () => {
  const [throughtput, setthrought] = useState(0)
  const [bandwidth,setbandWidth] = useState(0)
  const [usernum, setusernum] = useState(0)
  const [utilityfun, setutilityfun] = useState(null)


  const result = ()=>{
const finalresult = throughtput / (bandwidth * usernum)
if (isNaN(finalresult)) {
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
  setutilityfun(finalresult);
}
  }


  return (
    <div className="flex max-w-md flex-col gap-4">

    <Textinput final={setbandWidth} initial={bandwidth}  title="Channel Bandwidth (MHZ)" />
    <Textinput final={setthrought} initial={throughtput}  title="Throughput " />
    <Textinput final={setusernum} initial={usernum}  title="Number of users" />

 

      
   
      <ToastContainer/> 
      
      <button onClick={result}>utilityfun</button>
      <div>   {utilityfun}</div>
  
    </div>
  )
}

export default Utilityfunction
