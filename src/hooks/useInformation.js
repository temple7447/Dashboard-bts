// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
// Create a context for the user data
const UserContext = createContext();

// Create a custom hook to access the user data
export function useInformation() {
  return useContext(UserContext);
}

// Create a UserProvider component to wrap your app
export function UserProvider({ children }) {
  const [userName, setUserName] = useState('John Doe');
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [latgeo, setlatgeo] = useState('');
  const [longgeo, setlonggeo] = useState('');
  const [locationName, setLocationName] = useState('');
  const [useDistace, setdistance] = useState(3000);
  const [shatterbar, setshatterbar] = useState([]);
  const [southwestp, setsouthwest] = useState(0);
  const [northeastp, setnortheast] = useState(0);
  const [scannedCoordinates, setScannedCoordinates] = useState([]);
  const [scanagain, setScanAgain] = useState(false);
  const [populationArray, setpopulationArray] = useState([]);
  const [globarpathloss, setglobarpathloss] = useState(null);
  const [globelthroughtput, setglobelthroughtput] = useState(null);
  const [globeruf, setgloberuf] = useState(null);
  const [mute, setMute] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey, // Replace with your Google Maps API key
    libraries: ['elevation'], // Add 'elevation' library
  });
  // AIzaSyDVBRpXp9XL78sy4Ct5aBvHENRKpX7eMfw

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/population`)
      .then(res => {
        // console.log(res.data)
        setpopulationArray(res.data.info);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateUser = newName => {
    setUserName(newName);
  };

  return (
    <UserContext.Provider
      value={{
        scanagain,
        setScanAgain,
        northeastp,
        setnortheast,
        setsouthwest,
        southwestp,
        userName,
        updateUser,
        apiKey,
        setlatgeo,
        latgeo,
        setlonggeo,
        longgeo,
        isLoaded,
        setLocationName,
        locationName,
        useDistace,
        setdistance,
        shatterbar,
        setshatterbar,
        scannedCoordinates,
        setScannedCoordinates,
        populationArray,
        mute,
        setMute,
        globarpathloss,
        setglobarpathloss,
        setglobelthroughtput,
        globelthroughtput,
        globeruf,
        setgloberuf,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
