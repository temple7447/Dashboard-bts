// API Configuration
export const API_CONFIG = {
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
};

// Default values
export const DEFAULT_VALUES = {
  USER_NAME: 'John Doe',
  DEFAULT_DISTANCE: 3000,
};

// Google Maps configuration
export const GOOGLE_MAPS_CONFIG = {
  libraries: ['elevation'],
  mapId: 'google-map-script',
};
