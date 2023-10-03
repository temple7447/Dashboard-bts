import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useInformation } from '../Provider'
import {  useNavigate } from 'react-router-dom';
import app from '../firebase';
import { getDatabase, ref, set } from "firebase/database";
import { Alert } from 'flowbite-react';
import RollingCircleLoader from './RollingCircleLoader';
// import BarChart from './Chart';


const containerStyle = {

  height: '90vh',

};

function getElevation(location) {
  return new Promise((resolve, reject) => {
    const elevator = new window.google.maps.ElevationService();

    const locationRequest = {
      locations: [location],
    };

    elevator.getElevationForLocations(locationRequest, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        resolve(results[0].elevation);
      } else {
        reject(status);
      }
    });
  });
}


function DashbboardHomemain() {
  const [Iteration, setIteration] = useState('');
  const [coordinate, setCoordinate] = useState('');
  const [alertme, setAlertme] = useState(false);
  const [alertmesuc, setAlertmesuc] = useState(false);


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

  const handleWarningDismiss = () => setAlertme(false);
  const handleSuccessDismiss = () => setAlertmesuc(false);


  const navigate = useNavigate();
    const  { apiKey, setlatgeo , latgeo, setlonggeo, longgeo,isLoaded, setLocationName, locationName} = useInformation()
    const center = {
        lat: latgeo || 6.4,
        lng:  longgeo || 7.149430399999999
      };
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyAwjwRWC6rksF7GnJVyx6-b_hspjvWuI3Y"
//   });

  const [map, setMap] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [elevation, setElevation] = useState(null);

    useEffect(() => {
    if (isLoaded && map) {
      getElevation(center)
        .then((elevationData) => {
          setElevation(elevationData);
        })
        .catch((error) => {
          console.error('Error fetching elevation:', error);
        });
    }
  }, [isLoaded, map, locationName]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const handleGeocodeClick = () => {
    if (map && locationName) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: locationName }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          setAlertmesuc(true);
          setTimeout(() => {
            setAlertmesuc(false);
          }, 4000);
          const { lat, lng } = results[0].geometry.location;
          console.log(`Coordinates for "${locationName}": Latitude ${lat()}, Longitude ${lng()}`);
          setlatgeo(lat())
          setlonggeo(lng())
          setClickedLocation({ lat: lat(), lng: lng() }); // Use lat() and lng() functions
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }

   
  };

  const handleMapClick = (e) => {
    const { latLng } = e;
    setClickedLocation({ lat: latLng.lat(), lng: latLng.lng() });
    console.log(`Coordinates for clicked location: Latitude ${latLng.lat()}, Longitude ${latLng.lng()}`);
  };

  return isLoaded ? (
    <div>
      <div className='mx-5'>
        <input
        className='my-3 rounded-2xl w-96'
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
        <button style={{backgroundColor:'blue', padding:10,borderRadius:5}} className='mx-3' onClick={handleGeocodeClick}>Get location</button>

        <div>
        {alertme && (
          <Alert color="warning" onDismiss={handleWarningDismiss}>
            <span>
              <p>
                <span className="font-medium">Warning alert!</span>
                All fields must be inputted.
              </p>
            </span>
          </Alert>
        )}
        {alertmesuc && (
          <Alert color="success" onDismiss={handleSuccessDismiss}>
            <span>
              <p>
                <span className="font-medium">Success alert!</span>
                data was successfully sent.
              </p>
            </span>
          </Alert>
        )}
        <div>Elevation Value Changes</div>
        <div className='my-5'>
          <label htmlFor='number'>Number of Elevation</label>
          <input
            value={Iteration}
            placeholder='Default coordinate diff is 0'
            onChange={(e) => setIteration(e.target.value)}
            style={{ height: '30px', borderRadius: 5, width: '50vw' }}
            type="number"
            step="any"
            required
          />
        </div>
        <div>
          <label htmlFor='number'>Coordinate difference</label>
          <input
            value={coordinate}
            style={{ height: '30px', borderRadius: 5, width: '50vw' }}
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
      </div>

      {/* <BarChart /> */}
    </div>
  ) : <RollingCircleLoader />;
}

export default DashbboardHomemain;
