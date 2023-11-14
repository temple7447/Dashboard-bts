import React, { useState } from 'react'
import Textinput from './Textinput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInformation } from '../../Provider';

const WeightUtility = () => {
    const [weightutility, setweightutility] = useState(null)
    const [usernum, setusernum] = useState(0)

    const {mute, setMute, globarpathloss, setglobarpathloss,globeruf,setgloberuf } = useInformation()


    const result = ()=>{
        const finalresult = usernum * usernum * globeruf / usernum;
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
            setweightutility(finalresult);
            setgloberuf(finalresult)
          }
      
    }

  return (
    <div className="flex max-w-md flex-col gap-4">

    <Textinput final={setgloberuf} initial={globeruf}  title="Channel Bandwidth (MHZ)" />
    <Textinput final={setusernum} initial={usernum}  title="Number of users" />

 

   
      <ToastContainer/> 

        <button onClick={result}>weightutility</button>
        <div>{weightutility}</div>
    </div>
  )
}

export default WeightUtility