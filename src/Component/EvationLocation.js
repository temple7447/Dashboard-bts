'use client';
import { useInformation } from '../Provider'
import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { Button, Checkbox, Label, Modal, TextInput, Table } from 'flowbite-react';

const containerStyle = {
  height: '70vh',
};



const numPoints = 10; // Adjust the number of points as needed
const numTopAltitudes = 3; // Number of top altitudes to circle

function EvationLocation() {
  const { apiKey, setlatgeo, latgeo, setlonggeo, longgeo, isLoaded } = useInformation()
  const [map, setMap] = useState(null);
  const [topElevations, setTopElevations] = useState([]);
  const [scannedCoordinates, setScannedCoordinates] = useState([]);
  const {checkOrdinate, setCheckOrdinate } = useState(null)
  const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null)
  const props = { openModal, setOpenModal, emailInputRef };

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
    if (isLoaded && map) {
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
        const elevations = [];
        for (const coordinate of scanCoordinates) {
          const elevation = await getElevationForCoordinate(coordinate);
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
          console.error('Error fetching elevations:', error);
        });
    }
  }, [isLoaded, map]);

  const onLoad = (map) => {
   
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const HandleShowModel = (item)=>{
    // setCheckOrdinate(item)
    props.setOpenModal('initial-focus')
  }
  console.log("selected Value", topElevations)
  console.log("selected Value check", checkOrdinate)
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
      <div>Total Coordinate Scanned:{scannedCoordinates.length}</div>
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
          <Table.Cell>      <Button onClick={()=> HandleShowModel(item)}>Check</Button></Table.Cell>
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
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" ref={props.emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="/modal" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="/modal" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
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
