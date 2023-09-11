'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import {NavLink} from 'react-router-dom'


const SidebarPage = () => {
    return (
        <Sidebar className='' aria-label="Sidebar with logo branding example">

                <p className='' style={{fontSize:'30px', fontWeight:'bold'}}>   Base Station   </p>
       
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                <NavLink to='/' >
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        <p> Dashboard  </p>
                    </Sidebar.Item>
                    </NavLink>
                    <NavLink to='/location' >
                   
                    <Sidebar.Item href="#" icon={HiViewBoards} >
                        <p>        Kanban    </p>
                    </Sidebar.Item>
                    </NavLink>
                    <NavLink to='/Dashbboard' >
                    <Sidebar.Item href="#" icon={HiInbox}  >
                        <p>          Inbox      </p>
                    </Sidebar.Item>
                    </NavLink>
                    <Sidebar.Item href="#" icon={HiUser}  >
                        <p>       Users       </p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag} >
                        <p>       Products    </p>
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}


export default SidebarPage




