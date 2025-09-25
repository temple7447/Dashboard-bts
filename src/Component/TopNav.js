import React from 'react';
import imagelogo from '../Component/assest/satelite1.png';
import logotool from '../Component/assest/Tools1.png';
import { HiChartPie, HiViewBoards } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useInformation } from '../hooks/useInformation';
import About from '../About/About';

import { Button } from 'flowbite-react';

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row  items-center  justify-between  px-5 py-1 "
      style={{ backgroundColor: '#769cb6' }}
    >
      <div className="flex flex-row gap-3  items-center ">
        <div style={{ lineHeight: 0.8 }}>
          <span style={{ fontWeight: 700, fontSize: 25 }}>
            <span style={{ color: 'red', fontWeight: 900 }}>T</span>
            <span style={{ fontWeight: 900, color: 'green' }}>V</span>
            <span style={{ fontWeight: 900, color: 'blue' }}>W</span>
            <span style={{ fontWeight: 900, color: 'red' }}>S</span>
          </span>{' '}
          Planning tool
        </div>
        <img src={imagelogo} alt="logo" style={{ height: 50, width: 50 }} />
      </div>
      <div className="">
        <ul className="flex flex-row px-3  items-center  ">
          <Button onClick={() => navigate('/')} className=" mx-3">
            {' '}
            <li className="flex flex-row items-center gap-3">
              <HiViewBoards style={{ fontSize: 20 }} /> Dashboard
            </li>
          </Button>
          <Button onClick={() => navigate('/location')} className=" mx-3">
            {' '}
            <li className="flex flex-row items-center gap-3">
              <HiChartPie style={{ fontSize: 20 }} /> Elevation Coordinates
            </li>
          </Button>
          <li>
            {' '}
            <About />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
