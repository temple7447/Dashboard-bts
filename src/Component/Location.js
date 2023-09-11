
import { useInformation } from '../Provider'
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker ,  Circle} from '@react-google-maps/api';


const containerStyle = {
  width: '800px',
  height: '800px',
};



const numPoints = 10; // Adjust the number of points as needed
const numTopAltitudes = 10; // Number of top altitudes to circle

function MyComponent() {
    const  { apiKey, setlatgeo , latgeo, setlonggeo, longgeo,isLoaded} = useInformation()
  const [map, setMap] = useState(null);
  const [topElevations, setTopElevations] = useState([]);
  const [scannedCoordinates, setScannedCoordinates] = useState([]);

  const southwest = {
    lat:latgeo+0.05 || 7.110653, // Adjust these values for your desired range
    lng: longgeo+0.05 || 6.288584,
  };
  
  const northeast = {
    lat:latgeo-0.05 || 7.170653, // Adjust these values for your desired range
    lng:longgeo-0.05 || 6.34584,
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
      >
        {topElevations.map(({ coordinate, elevation }, index) => (
          <React.Fragment key={index}>
            <Marker
              position={coordinate}
              label={`Elevation: ${elevation.toFixed(2)} meters`}
            />
            {/* <Circle
              center={coordinate}
              radius={5000}
              options={{
                fillColor: 'rgba(0, 0, 255, 0.3)',
                strokeColor: 'blue',
              }}
            /> */}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(MyComponent);
