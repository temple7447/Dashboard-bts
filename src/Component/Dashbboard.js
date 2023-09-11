import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useInformation } from '../Provider';

const containerStyle = {
  width: '400px',
  height: '400px',
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

function MyComponent() {
    const  { apiKey, setlatgeo , latgeo, setlonggeo, longgeo,isLoaded} = useInformation()
    const center = {
        lat: latgeo || 6.4,
        lng: longgeo || 7.2,
      };

  const [map, setMap] = useState(null);
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
  }, [isLoaded, map]);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      {elevation !== null && <p>Elevation at center: {elevation} meters</p>}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(MyComponent);
