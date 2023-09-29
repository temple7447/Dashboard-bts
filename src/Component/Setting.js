import React,{useState,useEffect} from 'react'
import FormElements from './Model'
import app from '../firebase'
import { getDatabase, ref, set, get } from "firebase/database";
import HataPathLossCalculator from './Calculation';
import Test from './Test';
import BuildingNumberFinder from './Test1';


const Setting = () => {

    const  [Iteration, setIteration ] = useState(0)

    function writeUserData(userId) {
        const db = getDatabase();
        const userRef = ref(db, 'ElevationChanges/' + userId);
      
        // Use the set method to add or update data at the specified location
        set(userRef, {
            Iteration: Iteration,
       
        });
      }



  return (
    <div>
    <div style={{fontSize:'25px', fontWeight:700}} className='text-center'>Setting</div>
    <hr  />
<div>
<div >Elevation Value Changes</div>
<div className='my-5'>
<label htmlFor='number' >Number of Iteration </label>
    <input className='' onChange={(e)=> setIteration(e.target.value)} style={{height:'30px', borderRadius:5}} type="number" />
</div>    
<div>
<label htmlFor='number' >Number of Elevation </label>
    <input style={{height:'30px', borderRadius:5}} type="number" />
</div>    
<button style={{backgroundColor:'blue',color:'white', borderRadius:10, alignSelf:'center'}} className='p-2' onClick={()=> writeUserData("BTS")} >Save Changes</button>
</div>

<FormElements />
<HataPathLossCalculator />
<Test />
{/* <BuildingNumberFinder /> */}
    </div>
  )
}

export default Setting
