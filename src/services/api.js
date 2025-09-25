import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  config => {
    // Add auth token if available
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // Server responded with error status
      errorMessage =
        error.response.data?.message ||
        `Server Error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error. Please check your connection.';
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    // Show toast notification for errors (except for cancelled requests)
    if (!axios.isCancel(error)) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const populationAPI = {
  getPopulationData: () => api.get('/population'),
};

// Google Maps API helpers
export const mapsAPI = {
  geocodeAddress: async address => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error('Failed to geocode address');
      throw error;
    }
  },

  reverseGeocode: async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error('Failed to get location details');
      throw error;
    }
  },
};

// Generic API call wrapper with loading states
export const apiCall = async (apiFunction, loadingSetter = null) => {
  try {
    if (loadingSetter) loadingSetter(true);
    const response = await apiFunction();
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    if (loadingSetter) loadingSetter(false);
  }
};

export default api;
