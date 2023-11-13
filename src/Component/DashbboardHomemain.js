'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useInformation } from '../Provider'
import {  useNavigate } from 'react-router-dom';
import app from '../firebase';
import { getDatabase, ref, set,get } from "firebase/database";
import { Alert,Avatar ,Button ,Modal} from 'flowbite-react';
import RollingCircleLoader from './RollingCircleLoader';
import BarChart from './Chart';
import axios from 'axios';
import MapChart from './Shatter';
import imageimage from './assest/satellite2.png'
import './style.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Freespace from './Freespace';
import Tables from './Tables';
import ScannedTable from './ScannedTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {

  height: '30vh',
  width:'30vw',


};



function DashbboardHomemain() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const  {northeastp, southwestp ,apiKey, setlatgeo , latgeo, setlonggeo, longgeo,isLoaded, setLocationName, locationName, shatterbar, setshatterbar, useDistace,scannedCoordinates, setScannedCoordinates} = useInformation()

  const [Iteration, setIteration] = useState('');
  const [coordinate, setCoordinate] = useState('');
  const [alertme, setAlertme] = useState(false);
  const [alertmesuc, setAlertmesuc] = useState(false);
  const [alertmesuca, setAlertmesuca] = useState(false);
  const [numTopAltitudes, setnumTopAltitudes] = useState(null)
  const [populationNum, setPopulationNum] = useState(0)
  const [populationPlace, setpopulationPlace] = useState('')


  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${apiKey}`;

  const writeUserData = (userId) => {
    if (Iteration && coordinate) {
        const Iterationv = parseFloat(Iteration)
        const coordinatev = parseFloat(coordinate)
      const db = getDatabase();
      const userRef = ref(db, 'ElevationChanges/' + userId);

      set(userRef, {
        Iteration: Iterationv,
        coordinate: coordinatev
      });
 
      setIteration('');
      setCoordinate('');
      setAlertmesuc(true);
      setTimeout(() => {
        setAlertmesuc(false);
      }, 4000);
      setTimeout(() => {
      navigate("/location"); 
    },2000);
    } else {
      setAlertme(true);
      setTimeout(() => {
        setAlertme(false);
      }, 4000);
    }
  };




  useEffect(()=>{
    function readUserData(userId) {
      const db = getDatabase();
      const userRef = ref(db, 'ElevationChanges/' + userId);
    
      // Use the `get` function to retrieve data from the specified reference
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('Data retrieved:',  userData.Iteration);
            // console.log('Data retrieved:', userData.coordinate);
            const iterationAsInt = parseInt(userData.Iteration, 10); 
            // const coordinateAsFloat = parseInt(userData.coordinate, 10); 
          setnumTopAltitudes(iterationAsInt)
         
     
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error reading data:', error);
        });
    }
    readUserData("BTS");
  },[ numTopAltitudes, useDistace ])

  const handleWarningDismiss = () => setAlertme(false);
  const handleSuccessDismiss = () => setAlertmesuc(false);
  const handleSuccessDismissa = () => setAlertmesuca(false);

  const HandleSubmitBackend = ()=>{

    axios.post("https://bts-backend.onrender.com/population", {populationNum, populationPlace})
.then((res)=>{
  console.log(res.data.mgs)
  toast.success(`${res.data.mgs}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
setpopulationPlace('')
setPopulationNum(0)
})
.catch((err)=>{
  console.log(err)
  toast.error(`${err.response.data.mgs}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    setpopulationPlace('')
setPopulationNum(0)
})

  }


const  handleScannedCoordinates = ()=>{
  props.setOpenModal('default')
}

  const navigate = useNavigate();

  
  const [map, setMap] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [elevation, setElevation] = useState(null);


  const handleGeocodeClick = () => {

    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log(`Coordinates for "${locationName}": Latitude ${lat}, Longitude ${lng}`);
        setlatgeo(lat)
        setlonggeo(lng)
        setClickedLocation({ lat: lat, lng: lng });
      } else {
        // Handle no results found
        console.error('No results found for the given location.');
      }
    })
    .catch((error) => {
      // Handle error from API request
      console.error('Error fetching data:', error);
    });
   
    setAlertmesuca(true);
    setTimeout(() => {
      setAlertmesuca(false);
    }, 4000);
   
  };
 

  return  isLoaded ? (
    <div className='bodyimage' style={{}}>
   
    <div className='flex flex-row px-4' style={{height:'100%', width:'100%', justifyContent:'space-between',backgroundColor:"#ffffffff", alignItems:'center' }}>
    {alertmesuca && (
          <Alert style={{position:'absolute', }} color="success" onDismiss={handleSuccessDismissa}>
            <span>
              <p>
                <span className="font-medium">Success alert!</span>
                data was successfully sent.
              </p>
            </span>
          </Alert>
        )}
    <div>
   
    <AiOutlineSearch  style={{position:'absolute', fontSize:'30px', top:20}}/>
   
    <input
        className='my-3  w-30 placeh'
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
              <button style={{backgroundColor:'#3C74CE6C', padding:10,borderRadius:2, color:'white'}} className='mx-3' onClick={handleGeocodeClick}>Get location</button>
    </div>
    <div className='flex flex-row ' style={{alignItems:'center', gap:10}} >
        {alertme && (
          <Alert color="warning" style={{position:'absolute', }}  onDismiss={handleWarningDismiss}>
            <span>
              <p>
                <span className="font-medium">Warning alert!</span>
                All fields must be inputted.
              </p>
            </span>
          </Alert>
        )}
        {alertmesuc && (
          <Alert className='' style={{position:'absolute'}} color="success" onDismiss={handleSuccessDismiss}>
            <span>
              <p>
                <span className="font-medium">Success alert!</span>
                data was successfully sent.
              </p>
            </span>
          </Alert>
        )}

        <div >

          <input
            value={Iteration}
            placeholder='Enter numbers of elevation'
            onChange={(e) => setIteration(e.target.value)}
          
            type="number"
            step="any"
            required
            className='my-3  w-30 placeh'
          />
        </div>
        <div>
          <input
                  className='my-3  w-30 placeh'
            value={coordinate}
           
            type="number"
            step="any"
            placeholder='Default coordinate diff is 0.05'
            onChange={(e) => setCoordinate(e.target.value)}
            required
          />
        </div>
        <button
          style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, alignSelf: 'center' }}
          className='p-2'
          onClick={() => writeUserData("BTS")}
        >
          Save Changes
        </button>
      </div>
<div> <Avatar
        alt="avatar of Jese"
        img={imageimage}
        rounded
      />
</div>
    </div>
    

    <div style={{display:'flex', flexDirection:'row', gap:20}}>
          <input
                  className='my-3  w-30 placeh'
            value={populationPlace}
           
            type="text"
            step="any"
            placeholder='Enter of Place'
            onChange={(e) => setpopulationPlace(e.target.value)}
            required
          />
          <input
                  className='my-3  w-30 placeh'
            value={populationNum}
           
            type="number"
            step="any"
            placeholder='Enter Population number'
            onChange={(e) => setPopulationNum(e.target.value)}
            required
          />

<button
          style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, alignSelf: 'center' }}
          className='p-2'
          onClick={() => HandleSubmitBackend()}
        >
          Save Population
        </button>
        </div>

      <div className='gap-2 flex flex-row justify-around my-5' > 
      <div className="info-container mx-10" >
  <div>Total Coordinate Scanned: <span className="highlight">{scannedCoordinates.length}
  <>
      <Button onClick={() => handleScannedCoordinates()}>Scan coordinates</Button>
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Total Scanned Coordinates</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
        <ScannedTable scannedCoordinates={scannedCoordinates} />
         
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </span></div>
  <div>Number of Altitude to be Picked: <span className="highlight">{numTopAltitudes}</span></div>
  <div>Coverage Radius (Kms): <span className="highlight">{useDistace}</span></div>
  <div>Bandwidth Required : <span className="highlight">0.15</span></div>
</div>
<div className='p-3 ' style={{backgroundColor:'white', borderRadius:5,width:300 }}>
<div style={{textAlign:'center'}}>Empirical Model</div>
<div>
  <div>Modified Free Space</div>
  <div>Modified Hata Model ITV</div>
  <div>Egli Model EBS</div>
  <div>Egli Model ITV</div>
</div>
</div>

<div className='p-3 ' style={{backgroundColor:'white', borderRadius:5,width:300 }}>
<div style={{textAlign:'center'}}>Theoritical models Model</div>
<div>
<ol>
  <li>Free Space</li>
  <li>Hata Model</li>
  <li>Egli Model </li>
  </ol>
</div>
</div>
</div>



  

      {/* <BarChart /> */}
      <div className='flex flex-row'>
      <MapChart northeastp={northeastp} southwestp={southwestp} shatterbar={shatterbar} />
      <Tables />
      </div>

      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapTypeId="satellite"
      >
        {clickedLocation && (
          <Marker
            position={clickedLocation}
            title={`Clicked Location`}
           
          />
        )}
      </GoogleMap> */}

<ToastContainer/> 




 






    </div>
  ) : <RollingCircleLoader />;
}

export default DashbboardHomemain;
