'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiAdjustments } from 'react-icons/hi';
import { NavLink } from 'react-router-dom'


const SidebarPage = () => {
    return (
        <Sidebar className='' aria-label="Sidebar with logo branding example">

            <p className='' style={{ fontSize: '30px', fontWeight: 'bold' }}>   TVWS Planning Tool   </p>

            <Sidebar.Items>
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
               
                    {/* <NavLink to='/Setting' >
                    <Sidebar.Item href="#" icon={HiAdjustments} >
                        <p>   Setting       </p>
                    </Sidebar.Item>
                    </NavLink> */}

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}


export default SidebarPage




