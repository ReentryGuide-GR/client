// utils.js
import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';
import moment from 'moment';
import locationsData from './database/locations_basic.json'; // Ensure this path matches the location of your locations data file

// Haversine formula to calculate distance between two coordinates
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Function to find the closest location from a category
export const findClosestLocation = async (category) => {
  let userLocation = await getUserLocation();
  if (!userLocation) {
    Alert.alert("Error", "Unable to get user location");
    return null;
  }
  const categoryData = locationsData[category.charAt(0).toUpperCase() + category.slice(1)];
  if (!categoryData) {
    Alert.alert("Error", `Category ${category} not found`);
    return null;
  }
  // Initialize with the first location as the default and calculate distance for it
  let closestLocation = categoryData[0];
  let shortestDistance = getDistance(userLocation.latitude, userLocation.longitude, closestLocation.coordinates.lat, closestLocation.coordinates.lng);
  // Go through each location to find the closest
  categoryData.forEach(location => {
    const distance = getDistance(userLocation.latitude, userLocation.longitude, location.coordinates.lat, location.coordinates.lng);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestLocation = location;
    }
  });
  // Return both the closest location and the shortest distance to it
  return { location: closestLocation, distance: shortestDistance };
};

// Function to get the user's current location
export const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    Alert.alert('Location Error', "Couldn't get location");
    return null;
  }
};

// Function to open Google Maps with given coordinates and mode
export const openGoogleMaps = (lat, lng, mode = 'w') => {
  const modeParam = mode === 'bus' ? 'transit' : mode; // Google Maps uses 'transit' for public transportation
  const url = Platform.OS === 'android'
    ? `google.navigation:q=${lat},${lng}&mode=${modeParam}`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${modeParam}`;

  Linking.openURL(url).catch(err => Alert.alert("Error", "Couldn't load page"));
};

// Return Colors for Special Requirement Background and Text Colors
export const requirementsColorMapping = (colorName) => {
  const mappings = {
    Red: {
      backgroundColor: '#ffd1d1', // Example light red
      textColor: 'darkred', // Darker red for text
    },
    Yellow: {
      backgroundColor: '#ffe8ad', // Example light yellow
      textColor: '#543c00', // Darker yellow for text
    },
    Green: {
      backgroundColor: '#c1fcbb', // Example light green
      textColor: '#256029', // Darker green for text
    },
  };

  return mappings[colorName] || { backgroundColor: '#FFFFFF', textColor: '#000000' }; // Default case
};

// Convert 24-hour format to 12-hour format
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const isPM = hours >= 12;
  const formattedHours = ((hours + 11) % 12 + 1);
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${isPM ? 'pm' : 'am'}`;
};

export const updateLocationStatus = (openHours) => {
  const now = moment();
  const openTime = moment(openHours.open, "HH:mm");
  const closeTime = moment(openHours.close, "HH:mm");
  const closingSoonTime = moment(closeTime).subtract(1, 'hours');
  let status = '';
  let message = '';

  if (now.isBetween(openTime, closingSoonTime)) {
    status = 'open';
    message = `Closes at ${formatTime(openHours.close)}`;
  } else if (now.isBetween(closingSoonTime, closeTime)) {
    status = 'closingSoon';
    message = `Closes at ${formatTime(openHours.close)}`;
  } else if (now.isBefore(openTime) && now.isAfter(moment(openTime).subtract(1, 'hours'))) {
    status = 'openingSoon';
    message = `Opens at ${formatTime(openHours.open)}`;
  } else if (now.isBefore(openTime)) {
    status = 'closed';
    message = `Opens at ${formatTime(openHours.open)}`;
  } else {
    status = 'closed';
    message = `Opens at ${formatTime(openHours.open)}`;
  }

  return { status, message };
};

export const getStatusIndicatorStyle = (status) => {
  switch (status) {
    case 'closingSoon':
      return { backgroundColor: '#ffe8ad' };
    case 'openingSoon':
      return { backgroundColor: '#c1fcbb' };
    case 'open':
      return { backgroundColor: '#c1fcbb' };
    case 'closed':
      return { backgroundColor: '#ffd1d1' };
    default:
      return {};
  }
};

export const getStatusTextStyleColor = (status) => {
  switch (status) {
    case 'closingSoon':
      return '#543c00';
    case 'openingSoon':
      return '#075400';
    case 'open':
      return '#075400';
    case 'closed':
      return 'darkred';
    default:
      return 'white'; // Default color if none of the statuses match
  }
};

