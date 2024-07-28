// utils.js
import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';
import moment from 'moment';
import locationsData from './database/locations_basic.json'; // Ensure this path matches the location of your locations data file

// Haversine formula to calculate distance between two coordinates
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Function to filter locations that are open at the current time
export const filterOpenLocations = (categoryData) => {
  const now = moment();
  const currentDay = now.day(); // 0-6 where 0 is Sunday and 6 is Saturday
  const currentTime = now.format('HH:mm');

  const isOpen = (openHours) => {
    return openHours.some(hours => {
      if (hours.days.includes(currentDay)) {
        return currentTime >= hours.open && currentTime <= hours.close;
      }
      return false;
    });
  };

  const openLocations = categoryData.filter(location => {
    return isOpen(location.openHours || []);
  });

  console.log('Current Day:', currentDay);
  console.log('Current Time:', currentTime);
  console.log('Filtered Locations:', openLocations);

  return openLocations;
};

// Function to find the closest location from a category
export const findClosestLocation = async (category, userLocation) => {
  if (!userLocation) {
    throw new Error('User location is not provided');
  }

  const categoryData = locationsData[category];
  if (!categoryData) {
    Alert.alert('Error', `Category ${category} not found`);
    return null;
  }

  const openLocations = filterOpenLocations(categoryData);
  if (!openLocations || openLocations.length === 0) {
    Alert.alert('Error', 'No open locations found in the selected category');
    return null;
  }

  let closestLocation = openLocations[0];
  let shortestDistance = getDistance(
    userLocation.latitude,
    userLocation.longitude,
    closestLocation.coordinates.lat,
    closestLocation.coordinates.lng,
  );

  openLocations.forEach((location) => {
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      location.coordinates.lat,
      location.coordinates.lng,
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestLocation = location;
    }
  });

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
    console.error('Location Error', "Couldn't get location");
    throw error;
  }
};

// Function to open Google Maps with given coordinates and mode
// Function to open Google Maps or Moovit with given coordinates and mode
export const openGoogleMaps = (lat, lng, mode = 'w') => {
  const modeMappingApp = {
    driving: 'd', // Google Maps app uses 'd' for driving
    walking: 'w', // Google Maps app uses 'w' for walking
    bicycling: 'bicycling',
    transit: 'transit',
    bus: 'transit', // Specifying 'transit' as the mode for bus in native app
  };

  const modeMappingWeb = {
    driving: 'driving',
    walking: 'walking',
    bicycling: 'bicycling',
    transit: 'transit',
    bus: 'transit', // Web also uses 'transit' for bus
  };

  const modeParamApp = modeMappingApp[mode] || 'd'; // Default to driving if mode is not recognized for native apps
  const modeParamWeb = modeMappingWeb[mode] || 'driving'; // Default to driving for web

  if (mode === 'transit') {
    const moovitUrl = `moovit://directions?dest_lat=${lat}&dest_lon=${lng}&travelMode=publicTransport`;
    // Try to open Moovit for transit
    Linking.openURL(moovitUrl).catch(() => {
      openGoogleMapsViaLinking(lat, lng, modeParamApp, modeParamWeb);
    });
  } else {
    openGoogleMapsViaLinking(lat, lng, modeParamApp, modeParamWeb);
  }
};

const openGoogleMapsViaLinking = (lat, lng, modeParamApp, modeParamWeb) => {
  const baseUrl = Platform.OS === 'android'
    ? `google.navigation:q=${lat},${lng}&mode=${modeParamApp}`
    : `comgooglemaps://?daddr=${lat},${lng}&directionsmode=${modeParamApp}`;

  const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${modeParamWeb}`;

  // Try to open the native Google Maps
  Linking.canOpenURL(baseUrl).then((supported) => {
    if (supported) {
      Linking.openURL(baseUrl);
    } else {
      // If the app isn't installed, fall back to opening in a web browser
      Linking.openURL(webUrl).catch(() => {
        Alert.alert('Error', 'Unable to open Google Maps in a browser.');
      });
    }
  }).catch(() => {
    Alert.alert('Error', 'An error occurred while trying to open the map.');
  });
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

// Return Formatted week schedule based on database
export const formatOpenHours = (openHoursArray) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // // Ensure we're working with an array for both old and new structures
  // if (!Array.isArray(openHoursArray)) {
  //   // If openHoursArray is not an array, assume it's the old single object structure
  //   openHoursArray = [openHoursArray]; // Wrap it in an array for compatibility
  // }

  // Function to format a single openHours object
  const formatSingleOpenHours = (openHours) => {
    if (openHours.days.length === 7 && openHours.days.every((val, i) => val === i)) {
      return `Everyday \n${formatTime(openHours.open)} - ${formatTime(openHours.close)}`;
    }

    const daysFormatted = openHours.days.reduce((acc, day, index, arr) => {
      if (index > 0 && day - arr[index - 1] === 1) {
        acc[acc.length - 1].push(day);
      } else {
        acc.push([day]);
      }
      return acc;
    }, []).map((group) => {
      if (group.length > 1) {
        return `${daysOfWeek[group[0]]} - ${daysOfWeek[group[group.length - 1]]}`;
      }
      return daysOfWeek[group[0]];
    }).join(', ');

    return `${daysFormatted} \n ${formatTime(openHours.open)} - ${formatTime(openHours.close)}`;
  };

  // Iterate over each openHours object, format it, and combine the results
  return openHoursArray.map(formatSingleOpenHours).join('\n\n');
};

// Convert 24-hour format to 12-hour format
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const isPM = hours >= 12;
  const formattedHours = (((hours + 11) % 12) + 1);
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${isPM ? 'pm' : 'am'}`;
};

export const updateLocationStatus = (openHoursArray) => {
  // If time info not found, immediately return a status indicating
  // that the location operates by schedule only
  if (!openHoursArray || openHoursArray.length === 0) {
    return { status: 'scheduleOnly', message: 'Hours by Appointment', time: '' };
  }
  const now = moment();
  const dayOfWeek = now.day(); // Sunday as 0 through Saturday as 6
  // let currentOpenHours = null;

  // Find open hours for today
  const currentOpenHours = openHoursArray.find((openHours) => openHours.days.includes(dayOfWeek));

  let status = '';
  let time = '';

  if (currentOpenHours) {
    const openTime = moment(currentOpenHours.open, 'HH:mm');
    const closeTime = moment(currentOpenHours.close, 'HH:mm');
    const closingSoonTime = moment(closeTime).subtract(1, 'hours');

    // Determine status based on current time if open today
    if (now.isBetween(openTime, closingSoonTime)) {
      status = 'open';
      time = formatTime(currentOpenHours.close);
    } else if (now.isBetween(closingSoonTime, closeTime)) {
      status = 'closingSoon';
      time = formatTime(currentOpenHours.close);
    } else if (now.isAfter(closeTime)) {
      status = 'closed';
      time = '';
    } else if (now.isBefore(openTime) && now.isAfter(moment(openTime).subtract(1, 'hours'))) {
      status = 'openingSoon';
      time = `Today ${formatTime(currentOpenHours.open)}`;
    } else if (now.isBefore(openTime) && now.isSame(moment(), 'day')) {
      // Add this condition to check if the location opens later today
      status = 'closed';
      time = `Today ${formatTime(currentOpenHours.open)}`;
    } else {
      status = 'closed';
    }
  }

  // If closed or not open today, find the next open day
  if (!currentOpenHours || (status === 'closed' && time === '')) {
    const sortedDays = openHoursArray.reduce((acc, { days }) => [...acc, ...days], []).filter(
      (day) => day > dayOfWeek,
    ).sort();
    const nextDay = sortedDays.length ? sortedDays[0]
      : openHoursArray.reduce((acc, oh) => acc.concat(oh.days), []).sort()[0];
    const daysUntilNextOpen = nextDay >= dayOfWeek ? nextDay - dayOfWeek : nextDay + 7 - dayOfWeek;
    const nextOpenDate = moment().add(daysUntilNextOpen, 'days');
    const nextOpenHours = openHoursArray.find((oh) => oh.days.includes(nextOpenDate.day()));
    const nextOpenDayFormatted = nextOpenDate.isSame(moment().add(1, 'days'), 'day') ? 'Tomorrow' : nextOpenDate.format('dddd');
    time = `${nextOpenDayFormatted} at ${formatTime(nextOpenHours.open)}`;
    status = 'closed';
  }

  // Constructing the message based on status
  const message = status === 'open' || status === 'closingSoon' ? 'Will Close' : 'Will Open';

  return { status, message, time };
};

export const getStatusStyles = (status) => {
  let backgroundColor;
  let textColor;
  let text;
  switch (status) {
    case 'closingSoon':
      backgroundColor = '#ffe8ad';
      textColor = '#543c00';
      text = 'Closes Soon';
      break;
    case 'scheduleOnly':
      backgroundColor = '#ffe8ad';
      textColor = '#543c00';
      text = 'Schedule Only';
      break;
    case 'openingSoon':
      backgroundColor = '#c1fcbb';
      textColor = '#075400';
      text = 'Opens Soon';
      break;
    case 'open':
      backgroundColor = '#c1fcbb';
      textColor = '#075400';
      text = 'Opens Now';
      break;
    case 'closed':
      backgroundColor = '#ffd1d1';
      textColor = 'darkred';
      text = 'Closes Now';
      break;
    default:
      backgroundColor = 'transparent';
      textColor = 'black';
      text = '';
      break;
  }

  return {
    statusBackgroundColor: { backgroundColor },
    statusTextStyleColor: textColor,
    statusText: text,
  };
};
