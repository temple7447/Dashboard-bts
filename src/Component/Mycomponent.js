import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useInformation } from '../Provider'
const containerStyle = {

  height: '90vh',

};



function MyComponent() {
    const  { apiKey, setlatgeo , latgeo, setlonggeo, longgeo,isLoaded} = useInformation()
    const center = {
        lat: latgeo || 6.549430399999999,
        lng:  longgeo || 7.649430399999999
      };
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyAwjwRWC6rksF7GnJVyx6-b_hspjvWuI3Y"
//   });

  const [map, setMap] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [clickedLocation, setClickedLocation] = useState(null);

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
        <button style={{backgroundColor:'blue', padding:10,borderRadius:5}} className='mx-3' onClick={handleGeocodeClick}>Geocode</button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
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

export default React.memo(MyComponent);
