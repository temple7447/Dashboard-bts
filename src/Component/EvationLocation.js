'use client';
import { useInformation } from '../Provider'
import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { Button, Checkbox, Label, Modal, TextInput, Table } from 'flowbite-react';
import { getDatabase, ref, set, get } from "firebase/database";
import population from "./Population";
import FormElements from './Model';
import iconAntenna from  './assest/antenna.png'
import './style.css'
import RollingCircleLoader from './RollingCircleLoader';
const containerStyle = {
  height: '100vh',
};



const numPoints = 10; // Adjust the number of points as needed


function EvationLocation() {
  const { apiKey, setlatgeo, latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName, useDistace, setdistance, shatterbar, setshatterbar } = useInformation()
  const [map, setMap] = useState(null);
  const [topElevations, setTopElevations] = useState([]);
  const [scannedCoordinates, setScannedCoordinates] = useState([]);
  const [checkOrdinatediff, setCheckOrdinatediff]  = useState(0.05)
  const [openModal, setOpenModal] = useState();
  const [countpopulation, setcountpopulation] = useState()
  const emailInputRef = useRef(null)
  const props = { openModal, setOpenModal, emailInputRef };
  const [modelcovalue, setmodelcovalue] = useState()

  const [modelat, setmodelat] = useState('')

  let [numTopAltitudes, setnumTopAltitudes] = useState(null)
  const [frequency, setFrequency] = useState(743.25); // Default frequency in MHz
  const [distance, setDistance] = useState(1.0); // Default distance in kilometers
  const [pathLoss, setPathLoss] = useState(null);




//   useEffect(()=>{
// console.log(countpopulation)
//   }, [])
const  name = population?.filter((item)=>  item.Name == locationName )?.map((item,index)=>{
 
  return(
    <div key={index} className='' style={{ gap:10}}>
  <div> Name of Place Scanned:<span className="highlight"> {item.Name}</span> </div>
  <div>Population in the Area: <span className="highlight"> {item.population}</span> </div>
  </div>
  )
})
const  modealInfo = population?.filter((item)=> { return item.Name == locationName })



const iconOptions = {
  url: iconAntenna, // Path to your custom icon image
  scaledSize: new window.google.maps.Size(100, 100), // Specify the desired icon size
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
},[isLoaded, map, numTopAltitudes, useDistace,checkOrdinatediff ])


useEffect(()=>{
  function readUserData(userId) {
    const db = getDatabase();
    const userRef = ref(db, 'ElevationChanges/' + userId);
  
    // Use the `get` function to retrieve data from the specified reference
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
      
          console.log('Data retrieved:', userData.coordinate);
         
          const coordinateAsFloat = parseFloat(userData.coordinate, 10); 

          setCheckOrdinatediff(coordinateAsFloat)
   
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });
  }
  readUserData("BTS");
},[isLoaded, map, numTopAltitudes, useDistace,checkOrdinatediff ])


const calculatePathLoss = () => {

  const PL = 31.09 + 20 * Math.log10(frequency) + 20 * Math.log10(distance);
  setPathLoss(PL);
};

// const checkOrdinatediff = 0.05

  const validLat = typeof latgeo === 'number' ? latgeo : 7.110653; // Default to 7.110653 if latgeo is not a number
const validLng = typeof longgeo === 'number' ? longgeo : 6.288584; // Default to 6.288584 if longgeo is not a number

const southwest = {
  lat: validLat + checkOrdinatediff,
  lng: validLng + checkOrdinatediff,
};


  const northeast = {
    lat: validLat - checkOrdinatediff,  // Adjust these values for your desired range
    lng: validLng - checkOrdinatediff 
  };

  useEffect(() => {
    if (isLoaded && map ) {
      const latStep = (northeast.lat - southwest.lat) / numPoints;
      const lngStep = (northeast.lng - southwest.lng) / numPoints;

      let currentLat = southwest.lat;
      let currentLng = southwest.lng;

      const scanCoordinates = [];

      // Generate a grid of coordinates to scan
      for (let i = 0; i <= numPoints; i++) {
        for (let j = 0; j <= numPoints; j++) {
          scanCoordinates.push({ lat: currentLat, lng: currentLng });
          currentLng += lngStep;
        }
        currentLng = southwest.lng;
        currentLat += latStep;
      }

  // setScannedCoordinates(scanCoordinates)
      // Function to fetch elevation for a single coordinate
      const getElevationForCoordinate = async (coordinate) => {
        const elevator = new window.google.maps.ElevationService();
        const locationRequest = {
          locations: [coordinate],
        };

        return new Promise((resolve, reject) => {
          elevator.getElevationForLocations(locationRequest, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              resolve(results[0].elevation);
            } else {
              reject(status);
            }
          });
        });
      };



      // Sort elevations and keep the top numTopAltitudes
      const findTopElevations = async () => {
        const elevations = [];
        for (const coordinate of scanCoordinates) {
          const elevation = await getElevationForCoordinate(coordinate);
        // console.log("undefine",coordinate)
          if (elevation !== null) {
            elevations.push({ elevation, coordinate });
          }
          scannedCoordinates.push(coordinate);
        }
        elevations.sort((a, b) => b.elevation - a.elevation);
        return elevations.slice(0, numTopAltitudes);
      };
      
    

      findTopElevations()
        .then((topElevations) => {
          setTopElevations(topElevations);
        })
        .catch((error) => {
          console.error('Error fetching elevations:');
        });
    }
  }, [isLoaded, map, numTopAltitudes, useDistace]);

  const onLoad = (map) => {
   
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const HandleShowModel = (item)=>{
    // setCheckOrdinate(item)

    setmodelcovalue(item)
    props.setOpenModal('initial-focus')
  }


  // useEffect(()=>{
  //   console.log("selected Value", topElevations)
  //   console.log("selected Value check", checkOrdinate)
  // },[])

  useEffect(() => {
    // Log the scanned coordinates when the component mounts
    console.log('Scanned Coordinates:', scannedCoordinates);
    setshatterbar(scannedCoordinates)
    if(topElevations.length > 0 ){
      localStorage.setItem('populationData', JSON.stringify(topElevations));
    }

  },[]);

  const savedPopulationData = localStorage.getItem('populationData');
  const parsedPopulationData = JSON.parse(savedPopulationData);
  console.log("saved me",parsedPopulationData)

  return true ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={southwest} // Set the center to the southwest corner of the range
        zoom={10} // Adjust the initial zoom level as needed
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId="hybrid"
       
      >
        {topElevations.map(({ coordinate, elevation }, index) => (
          <React.Fragment key={index}>
            <Marker
              position={coordinate}
              label={`Elevation: ${elevation.toFixed(4)} meters`}
              icon={iconOptions}


            />
            <Circle
              center={coordinate}
              radius={useDistace}
              options={{
                fillColor: 'rgba(0, 0, 255, 0.3)',
                strokeColor: 'blue',
              }}
            />
          </React.Fragment>
        ))}

      </GoogleMap>
      <div className="info-container">
      {name}


  <div>Total Coordinate Scanned: <span className="highlight">{scannedCoordinates.length}</span></div>
  <div>Number of Altitude to be Picked: <span className="highlight">{numTopAltitudes}</span></div>
  <div>Coverage Radius (Kms): <span className="highlight">{useDistace}</span></div>
  <div>Bandwidth Required : <span className="highlight">0.15</span></div>
  <button style={{backgroundColor:'blue', padding:10, borderRadius:5}}>Scan again</button>

</div>

      {/* <div>Total Coordinate Scanned: <span> {scannedCoordinates.length}</span></div> */}
      <div>
      <Table striped>
      <Table.Head>
        <Table.HeadCell>
NO
        </Table.HeadCell>
        <Table.HeadCell>
  Longitude Value
        </Table.HeadCell>
        <Table.HeadCell>
Latitude Value
        </Table.HeadCell>
        <Table.HeadCell>
Elevation Value
        </Table.HeadCell>
        <Table.HeadCell> Order </Table.HeadCell>
        <Table.HeadCell>Result</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">


      {topElevations.length > 0 ? (
        topElevations?.map((item, index) => {
   
    const { elevation} = item
    const {lat, lng } = item?.coordinate

    return (
      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">  {index+1} </Table.Cell>
          <Table.Cell> {lng} </Table.Cell>
          <Table.Cell>  {lat}  </Table.Cell>
          <Table.Cell> {elevation}</Table.Cell>
          <Table.Cell>      <Button onClick={()=>{ calculatePathLoss(); HandleShowModel(item, locationName, modealInfo)}}>Check</Button></Table.Cell>
          <Table.Cell>
            {/* <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            > */}
            <Button>              <p>
              Save
              </p>
              </Button>

            {/* </a> */}
          </Table.Cell>
        </Table.Row>
    );
  })
) : (
  <div className='my-3 text-center ' style={{ alignSelf: 'center', alignItems:'center' }}>
      <div className='loader'></div>
    </div>
)}


  
 
 
 
      </Table.Body>
    </Table>
</div>
   <FormElements  modelcovalue={modelcovalue} locationName={locationName} props={props}/>
    </div>
  ) : (
    <div >
    <RollingCircleLoader />
    </div>
  );
}

export default EvationLocation



