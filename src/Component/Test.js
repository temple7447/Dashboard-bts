import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiKey = 'AIzaSyBRh1v_PR9tj_gDhALkJdbbm4-70ODDCr8'; // Replace with your API key

const Test = () => {
  const location = { lat: 7.0968645, lng: 6.304773400000001 }; // Replace with your desired coordinates

  const handleReverseGeocoding = latLng => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const locationName = results[0].formatted_address;
          console.log('Location Name:', locationName);
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  };

  useEffect(() => {
    handleReverseGeocoding(location);
  }, [location]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap id="map" center={location} zoom={15}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Test;
