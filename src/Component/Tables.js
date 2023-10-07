import React from 'react'

const Tables = () => {

  const storedArray = JSON.parse(localStorage.getItem('yourArrayKey')) || [];

  console.log(storedArray)

    
  return (
<div className="flex flex-col">
<div style={{textDecoration:'underline', textAlign:'center'}}>Saved Coordinates</div>
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">Nos</th>
              <th scope="col" className="px-6 py-4">Elevation</th>
              <th scope="col" className="px-6 py-4">Longtitude</th>
              <th scope="col" className="px-6 py-4">Latitude</th>
              <th scope="col" className="px-6 py-4">Place</th>
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
          {storedArray.map((items,index)=>{
            console.log(items)

            return(
              <tr key={index} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-2 py-4 font-medium"> {index+1} </td>
              <td className="whitespace-nowrap px-2 py-4">{items?.elevation}</td>
              <td className="whitespace-nowrap px-2 py-4">{items?.coordinate.lng}</td>
              <td className="whitespace-nowrap px-2 py-4">{items?.coordinate.lat}</td>
              <td className="whitespace-nowrap px-2 py-4">Auchi</td>
              <td className="whitespace-nowrap px-2 py-4">Delete</td>
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