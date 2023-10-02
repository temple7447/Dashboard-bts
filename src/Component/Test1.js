import React, { useState } from 'react';

const BuildingNumberFinder = () => {
  const [latitude, setLatitude] = useState(37.7749); // Replace with your desired latitude
  const [longitude, setLongitude] = useState(-122.4194); // Replace with your desired longitude
  const [buildingNumber, setBuildingNumber] = useState(null);

  const handleFindBuildingNumber = () => {
    // const apiKey = 'AIzaSyAwjwRWC6rksF7GnJVyx6-b_hspjvWuI3Y'; // Replace with your Google Maps API key
    const latLng = new window.google.maps.LatLng(latitude, longitude);
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          // Parse the address components to find the building number
          const addressComponents = results[0].address_components;
          const buildingNumberComponent = addressComponents.find(
            (component) => component.types.includes('street_number')
          );

          if (buildingNumberComponent) {
            const number = buildingNumberComponent.short_name;
            setBuildingNumber(number);
          } else {
            setBuildingNumber('Building number not found.');
          }
        } else {
          setBuildingNumber('No results found.');
        }
      } else {
        setBuildingNumber('Geocoding failed.');
      }
    });
  };

  return (
    <div>
      <h1>Building Number Finder</h1>
      <div>
        <label>Latitude: </label>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Longitude: </label>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={handleFindBuildingNumber}>Find Building Number</button>
      {buildingNumber !== null && (
        <div>
          <h2>Building Number: {buildingNumber}</h2>
        </div>
      )}
    </div>
  );
};

export default BuildingNumberFinder;
