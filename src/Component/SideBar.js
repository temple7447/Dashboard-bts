'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiViewBoards,  } from 'react-icons/hi';
import { NavLink } from 'react-router-dom'
import imagelogo  from '../Component/assest/satelite1.png'
import { useInformation } from '../Provider'


const SidebarPage = () => {
  const {scanagain, setScanAgain,northeastp,setnortheast,setsouthwest,southwestp, apiKey, setlatgeo, latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName, useDistace, setdistance, shatterbar, setshatterbar,scannedCoordinates, setScannedCoordinates } = useInformation()

 
    return (
 
        <Sidebar className='' aria-label="Sidebar with logo branding example" >

<div className='flex flex-row gap-3'>
            <p className='' style={{ fontSize: '30px', fontWeight: 'bold' }}> TVWSPT   </p>
            <img src={imagelogo} alt="logo" style={{height:50, width: 50}} />
</div>
            <Sidebar.Items >
                <Sidebar.ItemGroup>
                    <NavLink to='/' >
                        <Sidebar.Item  icon={HiChartPie}>
                            <p> Dashboard  voke</p>
                        
                        </Sidebar.Item>
                    </NavLink>
                    <NavLink to='/location' >

                        <Sidebar.Item  icon={HiViewBoards} >
                            <p>   Elevation Coordinates   </p>
                        </Sidebar.Item>
                    </NavLink>
 
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        


   
        </Sidebar>

    )
}


export default SidebarPage




