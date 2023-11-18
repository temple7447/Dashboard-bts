import React, { useState } from 'react'
import Textinput from './Textinput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInformation } from '../../Provider';

const WeightUtility = ({item}) => {
    const [weightutility, setweightutility] = useState(null)
    const [usernum, setusernum] = useState(0)

    const {mute, setMute, globarpathloss, setglobarpathloss,globeruf,setgloberuf } = useInformation()


 

    const handlePopulation = (item) => {
      const retrievedData = JSON.parse(localStorage.getItem("suitableHeight")) || [];
    
      // Check if an item with the same coordinates already exists
      const existingItem = retrievedData.find(existingItem => (
        existingItem.coordinate.lat === item.coordinate.lat &&
        existingItem.coordinate.lng === item.coordinate.lng
      ));
    
      if (!existingItem && weightutility !== null) {
        // Item with the same coordinates doesn't exist, add it to the array
        const updatedObject = { ...item, weightutlity: weightutility }
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
        
        
      } else if(existingItem){
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


    const result = ()=>{
      const finalresult = usernum * usernum * globeruf / usernum;
      console.log(finalresult)
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
      
        }
    
  }
  

  return (
    <div className="flex max-w-md flex-col gap-4">

    <Textinput final={setgloberuf} initial={globeruf}  title="utility functions" />
    <Textinput final={setusernum} initial={usernum}  title="Number of users" />

 

   
      <ToastContainer/> 

      <button onClick={()=> {result(); handlePopulation(item) }} style={{backgroundColor:'blue', padding:10, borderRadius:5, }} >Weight Utility</button>
        <div>{weightutility}</div>
    </div>
  )
}

export default WeightUtility