import React from 'react'
import {Outlet} from 'react-router-dom'
import SidebarPage from './SideBar'

const Unique = () => {
  return (
    <div className='flex flex-row'>
    <div style={{height:'100vh'}} >
    <SidebarPage />
    </div>
    <div style={{  width: '80vw',}} className='mx-auto'>
      <Outlet />
      </div>

    </div>
  )
}

export default Unique
