import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useInformation } from '../Provider'
import {  useNavigate } from 'react-router-dom';
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

    setTimeout(() => {
      navigate("/Setting"); 
    },2000);
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
        <button style={{backgroundColor:'blue', padding:10,borderRadius:5}} className='mx-3' onClick={handleGeocodeClick}>Get Coordinate</button>
        {elevation !== null && <p>Elevation at center: {elevation} meters</p>}
      </div>
      <GoogleMap
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
      </GoogleMap>
    </div>
  ) : <></>;
}

export default DashbboardHomemain;
