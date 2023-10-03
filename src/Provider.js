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
  const  apiKey = "AIzaSyAwjwRWC6rksF7GnJVyx6-b_hspjvWuI3Y"
  const [latgeo, setlatgeo] = useState('')
  const [longgeo, setlonggeo] = useState('')
  const [locationName, setLocationName] = useState('');
const [useDistace, setdistance] = useState(3000)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDVBRpXp9XL78sy4Ct5aBvHENRKpX7eMfwz', // Replace with your Google Maps API key
    libraries: ['elevation'], // Add 'elevation' library
  });

  const updateUser = (newName) => {
    setUserName(newName);
  };

  return (
    <UserContext.Provider value={{ userName, updateUser, apiKey, setlatgeo , latgeo, setlonggeo, longgeo, isLoaded, setLocationName, locationName, useDistace, setdistance}}>
      {children}
    </UserContext.Provider>
  );
}
