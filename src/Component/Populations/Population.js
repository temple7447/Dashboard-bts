
'use client';

import axios from 'axios';
import { Button, Modal, Select } from 'flowbite-react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PopulationModel ({item}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const [populationNum, setPopulationNum] = useState(0)
  const [populationPlace, setpopulationPlace] = useState('')


  const handlePopulation = (item) => {
    const retrievedData = JSON.parse(localStorage.getItem("suitableHeight")) || [];
  
    // Check if an item with the same coordinates already exists
    const existingItem = retrievedData.find(existingItem => (
      existingItem.coordinate.lat === item.coordinate.lat &&
      existingItem.coordinate.lng === item.coordinate.lng
    ));
  
    if (!existingItem) {
      // Item with the same coordinates doesn't exist, add it to the array
      const updatedObject = { ...item, population: populationNum };
      retrievedData.push(updatedObject);
      localStorage.setItem("suitableHeight", JSON.stringify(retrievedData))
      toast.success(`coordinates add to the list`, {
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
      // Item with the same coordinates already exists, handle accordingly
      console.log("Item with the same coordinates already exists.")
      toast.error(`same coordinates already exists.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };






  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => {setOpenModal(true)}}>Enter Population</Button>
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
          onClick={() =>  handlePopulation(item)}
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
