
'use client';

import axios from 'axios';
import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PopulationModel () {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const [populationNum, setPopulationNum] = useState(0)
  const [populationPlace, setpopulationPlace] = useState('')

  const HandleSubmitBackend = ()=>{


    axios.post("https://bts-backend.onrender.com/population", {populationNum, populationPlace})
.then((res)=>{
  console.log(res.data.mgs)
  toast.success(`${res.data.mgs}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
setpopulationPlace('')
setPopulationNum(0)
})
.catch((err)=>{
  console.log(err)
  toast.error(`${err.response.data.mgs}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    setpopulationPlace('')
setPopulationNum(0)
})
  }



  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setOpenModal(true)}>Add Population</Button>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Add Population Number and Place</Modal.Header>
        <Modal.Body>
        <div style={{display:'flex', flexDirection:'column',gap:20}}>
          <input
                  className='my-3  w-30 placeh'
            value={populationPlace}
           
            type="text"
            step="any"
            placeholder='Enter of Place'
            onChange={(e) => setpopulationPlace(e.target.value)}
            required
          />
          <input
                  className='my-3  w-30 placeh'
            value={populationNum}
           
            type="number"
            step="any"
            placeholder='Enter Population number'
            onChange={(e) => setPopulationNum(e.target.value)}
            required
          />

<button
          style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, alignSelf: 'center' }}
          className='p-2'
          onClick={() => HandleSubmitBackend()}
        >
          Save Population
        </button>
        </div>
        </Modal.Body>
    
      </Modal>
      <ToastContainer/> 
    </>
  );
}
