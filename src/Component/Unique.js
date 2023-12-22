import React from 'react'
import {Outlet} from 'react-router-dom'

import TopNav from './TopNav'

const Unique = () => {
  return (
    <div className='flex flex-col justify-between' style={{width:'100vw'}}>
    <div style={{}} >
   <TopNav />
    </div>
    <div style={{  width: '100vw',}} className='mx-auto'>
      <Outlet />
      </div>

    </div>
  )
}

export default Unique
