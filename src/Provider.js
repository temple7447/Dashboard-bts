// UserContext.js
import React, { createContext, useContext, useState } from 'react';
import { useJsApiLoader,  } from '@react-google-maps/api';
// Create a context for the user data
const UserContext = createContext();

// Create a custom hook to access the user data
export function useInformation() {
  return useContext(UserContext);
}

// Create a UserProvider component to wrap your app
export function UserProvider({ children }) {
  const [userName, setUserName] = useState('John Doe');
  const  apiKey = "AIzaSyDVBRpXp9XL78sy4Ct5aBvHENRKpX7eMf"
  const [latgeo, setlatgeo] = useState('')
  const [longgeo, setlonggeo] = useState('')
  const [locationName, setLocationName] = useState('');
const [useDistace, setdistance] = useState(3000)
const [shatterbar, setshatterbar] = useState([])
const [southwestp,setsouthwest] = useState(0)
const [northeastp, setnortheast] =  useState(0)
const [scannedCoordinates, setScannedCoordinates] = useState([]);
const [scanagain, setScanAgain] = useState(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey, // Replace with your Google Maps API key
    libraries: ['elevation'], // Add 'elevation' library
  });
  // AIzaSyDVBRpXp9XL78sy4Ct5aBvHENRKpX7eMfw

  const updateUser = (newName) => {
    setUserName(newName);
  };

  return (
    <UserContext.Provider value={{scanagain, setScanAgain,northeastp,setnortheast,setsouthwest,southwestp, userName, updateUser, apiKey, setlatgeo , latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName, useDistace, setdistance, shatterbar, setshatterbar, scannedCoordinates, setScannedCoordinates}}>
      {children}
    </UserContext.Provider>
  );
}
