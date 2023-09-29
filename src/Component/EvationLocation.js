'use client';
import { useInformation } from '../Provider'
import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { Button, Checkbox, Label, Modal, TextInput, Table } from 'flowbite-react';
import { getDatabase, ref, set, get } from "firebase/database";
import population from "./Population";
const containerStyle = {
  height: '70vh',
};



const numPoints = 10; // Adjust the number of points as needed


function EvationLocation() {
  const { apiKey, setlatgeo, latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName } = useInformation()
  const [map, setMap] = useState(null);
  const [topElevations, setTopElevations] = useState([]);
  const [scannedCoordinates, setScannedCoordinates] = useState([]);
  const {checkOrdinate, setCheckOrdinate } = useState(null)
  const [openModal, setOpenModal] = useState();
  const [countpopulation, setcountpopulation] = useState()
  const emailInputRef = useRef(null)
  const props = { openModal, setOpenModal, emailInputRef };
  const [modelcovalue, setmodelcovalue] = useState()

  const [modelat, setmodelat] = useState('')

  let [numTopAltitudes, setnumTopAltitudes] = useState(5)
  const [frequency, setFrequency] = useState(743.25); // Default frequency in MHz
  const [distance, setDistance] = useState(1.0); // Default distance in kilometers
  const [pathLoss, setPathLoss] = useState(null);
  console.log(locationName)

//   useEffect(()=>{
// console.log(countpopulation)
//   }, [])
const  name = population?.filter((item)=>  item.Name == locationName )?.map((item,index)=>{
 
  return(
    <div key={index} className='' style={{display:'flex', gap:10}}>
  <div> Name of Place Scanned:  {item.Name},</div>
  <div>Population in the Area: {item.population} </div>
  </div>
  )
})
const  modealInfo = population?.filter((item)=> { return item.Name == locationName })





useEffect(()=>{
  function readUserData(userId) {
    const db = getDatabase();
    const userRef = ref(db, 'ElevationChanges/' + userId);
  
    // Use the `get` function to retrieve data from the specified reference
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log('Data retrieved:', userData.Iteration);
          const iterationAsInt = parseInt(userData.Iteration, 10);
          setnumTopAltitudes(iterationAsInt)
          console.log(iterationAsInt)
      
     
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });
  }
  readUserData("BTS");
},[numTopAltitudes])


const calculatePathLoss = () => {

  const PL = 31.09 + 20 * Math.log10(frequency) + 20 * Math.log10(distance);
  setPathLoss(PL);
};


const differ = 0.05
  const validLat = typeof latgeo === 'number' ? latgeo : 7.110653; // Default to 7.110653 if latgeo is not a number
const validLng = typeof longgeo === 'number' ? longgeo : 6.288584; // Default to 6.288584 if longgeo is not a number

const southwest = {
  lat: validLat + differ,
  lng: validLng + differ,
};


  const northeast = {
    lat: validLat - differ,  // Adjust these values for your desired range
    lng: validLng - differ 
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
        const elevationPromises = scanCoordinates?.map(async (coordinate) => {
          const elevation = await getElevationForCoordinate(coordinate);
          // console.log("undefined", coordinate);
          return { elevation, coordinate };
        });
      
        const elevations = await Promise.all(elevationPromises);
      
        const validElevations = elevations.filter((elevationData) => elevationData.elevation !== null);
      
        validElevations.sort((a, b) => b.elevation - a.elevation);
      
        const topElevations = validElevations.slice(0, numTopAltitudes);
      
        return topElevations;
      };
      

      findTopElevations()
        .then((topElevations) => {
          setTopElevations(topElevations);
        })
        .catch((error) => {
          console.error('Error fetching elevations:');
        });
    }
  }, [isLoaded, map, numTopAltitudes]);

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

  console.log("check",modelcovalue)
  // useEffect(()=>{
  //   console.log("selected Value", topElevations)
  //   console.log("selected Value check", checkOrdinate)
  // },[])

  useEffect(() => {
    // Log the scanned coordinates when the component mounts
    console.log('Scanned Coordinates:', scannedCoordinates);
  }, [scannedCoordinates]);



  return isLoaded ? (
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
              label={`Elevation: ${elevation.toFixed(2)} meters`}
            />
            <Circle
              center={coordinate}
              radius={300}
              options={{
                fillColor: 'rgba(0, 0, 255, 0.3)',
                strokeColor: 'blue',
              }}
            />
          </React.Fragment>
        ))}

      </GoogleMap>
      <div style={{display:'flex', gap:10}}>Total Coordinate Scanned:{scannedCoordinates.length},   Number of Atitude to be Pick: {numTopAltitudes}, {name}</div>
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
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>
                Edit
              </p>
            </a>
          </Table.Cell>
        </Table.Row>
    );
  })
) : (
  <div className='my-3 text-center ' style={{alignSelf:'center'}}>
    Loading...
  </div>
)}


  
 
 
 
      </Table.Body>
    </Table>
</div>
    <Modal
        show={props.openModal === 'initial-focus'}
        size="4xl"
        popup
        onClose={() => props.setOpenModal(undefined)}
        initialFocus={props.emailInputRef}
      >
        <Modal.Header style={{textAlign:'center',}}>
    <div style={{textAlign:'center', alignSelf:'center'}}>BTS Modals Evaluator</div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
          <div>elevation:{modelcovalue?.elevation}, coordinate: latitude - {modelcovalue?.coordinate?.lat}, longitude - {modelcovalue?.coordinate?.lng},  place: {locationName} </div>
            {/* <h3>pathLoss: {pathLoss}db</h3> */}
            <div className='' style={{display:'flex',gap:10}}>
            <div className='space-y-6'>
         
         <div onClick={()=> alert("wewe")} className="w-full">
           <Button >Modified Free Space</Button>
         </div>
         <div className="w-full">
           <Button>Modified Hata Model ITV</Button>
         </div>
         <div className="w-full">
           <Button>Egli Model EBS</Button>
         </div>
         <div className="w-full">
           <Button>Egli Model ITV</Button>
         </div>
         
         </div> 
         
          <div style={{  borderLeftWidth:10, borderLeftColor:'black', padding:"10px"}}>
            sdsds
          </div>
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  ) : (
    <div >Loading...</div>
  );
}

export default EvationLocation



