import React, {useEffect, useState} from 'react'

const Tables = () => {
  const [storedArray, setstoredArray] = useState([])
  const [change, setChange] = useState(false)


  useEffect(()=>{
    const storedArray = JSON.parse(localStorage.getItem('yourArrayKey')) || [];
    setstoredArray(storedArray)
  },[change])




  const HandleDelete = async (lng, lat)=>{
    // console.log(lng,lat)
    const storedArray = JSON.parse(localStorage.getItem('yourArrayKey')) || [];
  const indexToRemove = storedArray.findIndex(item => item.coordinate.lng === lng && item.coordinate.lat === lat );

  // //  localStorage.setItem('yourArrayKey', JSON.stringify(storedArray))
  if (indexToRemove !== -1) {
    storedArray.splice(indexToRemove, 1);
  }
  localStorage.setItem('yourArrayKey', JSON.stringify(storedArray));
  setChange(pre=> !pre)
  }
    
  return (
<div className="flex flex-col px-2">
<div style={{textDecoration:'underline', textAlign:'center'}}>Saved Coordinates</div>
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-2 py-4">Nos</th>
              <th scope="col" className="px-2 py-4">Elevation</th>
              <th scope="col" className="px-2 py-4">Longtitude</th>
              <th scope="col" className="px-2 py-4">Latitude</th>
              <th scope="col" className="px-2 py-4">Place</th>
              <th scope="col" className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
          {storedArray.map((items,index)=>{
      

            return(
              <tr key={index} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-2 py-4 font-medium"> {index+1} </td>
              <td className="whitespace-nowrap px-2 py-4">{items?.elevation}</td>
              <td className="whitespace-nowrap px-2 py-4">{items?.coordinate.lng}</td>
              <td className="whitespace-nowrap px-2 py-4">{items?.coordinate.lat}</td>
              <td className="whitespace-nowrap px-2 py-4">{items?.name}</td>
              <td onClick={()=>HandleDelete(items?.coordinate.lng,items?.coordinate.lat)}  style={{backgroundColor:'red', borderRadius:5, color:'white'}} className="whitespace-nowrap px-2 py-4">Delete</td>
            </tr>
            )
          })}
          
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Tables