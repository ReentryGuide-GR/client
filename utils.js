// utils.js
import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';
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

