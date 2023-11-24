'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiViewBoards,  } from 'react-icons/hi';
import { NavLink } from 'react-router-dom'
import imagelogo  from '../Component/assest/satelite1.png'
import logotool from '../Component/assest/Tools1.png'
import { useInformation } from '../Provider'
import About from '../About/About';


const SidebarPage = () => {
  const {scanagain, setScanAgain,northeastp,setnortheast,setsouthwest,southwestp, apiKey, setlatgeo, latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName, useDistace, setdistance, shatterbar, setshatterbar,scannedCoordinates, setScannedCoordinates } = useInformation()

 
    return (
 
        <Sidebar className='' aria-label="Sidebar with logo branding example" >

<div className='flex flex-row gap-3'>
<div style={{lineHeight:0.8}}><span style={{fontWeight:700, fontSize:25}}>
<span style={{color:"red", fontWeight:900}}>T</span><span style={{fontWeight:900, color:"green"}}>V</span><span style={{fontWeight:900, color:"blue"}}>W</span><span style={{fontWeight:900, color:'red'}}>S</span>
</span> Planning tool</div>
            <img src={imagelogo} alt="logo" style={{height:50, width: 50}} />

</div>
            <Sidebar.Items >
                <Sidebar.ItemGroup>
                    <NavLink to='/' >
                        <Sidebar.Item  icon={HiChartPie}>
                            <p> Dashboard  </p>
                        
                        </Sidebar.Item>
                    </NavLink>
                    <NavLink to='/location' >

                        <Sidebar.Item  icon={HiViewBoards} >
                            <p>   Elevation Coordinates   </p>
                        </Sidebar.Item>
                    </NavLink>
                    <About /> 
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        


   
        </Sidebar>

    )
}


export default SidebarPage




