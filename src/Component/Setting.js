import React from 'react'
import FormElements from './Model'

const Setting = () => {
    const HangleElevation = ()=>{
        alert("you are welcome")
    }
  return (
    <div>
    <div style={{fontSize:'25px', fontWeight:700}} className='text-center'>Setting</div>
    <hr  />
<div>
<div >Elevation Value Changes</div>
<div className='my-5'>
<label htmlFor='number' >Number of Iteration </label>
    <input className='' style={{height:'30px', borderRadius:5}} type="number" />
</div>    
<div>
<label htmlFor='number' >Number of Elevation </label>
    <input style={{height:'30px', borderRadius:5}} type="number" />
</div>    
<button style={{backgroundColor:'blue',color:'white', borderRadius:10, alignSelf:'center'}} className='p-2' onClick={HangleElevation} >Save Changes</button>
</div>

<FormElements />
    </div>
  )
}

export default Setting
