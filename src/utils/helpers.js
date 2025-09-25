/**
 * Format number to specified decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (isNaN(value)) return '0';
  return Number(value).toFixed(decimals);
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Validate coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean} True if coordinates are valid
 */
export const validateCoordinates = (lat, lng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

/**
 * Format coordinate to display string
 * @param {number} coord - Coordinate value
 * @param {string} type - 'lat' or 'lng'
 * @returns {string} Formatted coordinate string
 */
export const formatCoordinate = (coord, type) => {
  if (!coord) return '0.000000°';
  const direction =
    type === 'lat' ? (coord >= 0 ? 'N' : 'S') : coord >= 0 ? 'E' : 'W';
  return `${Math.abs(coord).toFixed(6)}° ${direction}`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Convert meters to kilometers
 * @param {number} meters - Distance in meters
 * @returns {number} Distance in kilometers
 */
export const metersToKm = meters => {
  return meters / 1000;
};

/**
 * Convert kilometers to meters
 * @param {number} km - Distance in kilometers
 * @returns {number} Distance in meters
 */
export const kmToMeters = km => {
  return km * 1000;
};
