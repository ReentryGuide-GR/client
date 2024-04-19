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
  const categoryData = locationsData[category.charAt(0) + category.slice(1)];
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
// Function to open Google Maps or Moovit with given coordinates and mode
export const openGoogleMaps = (lat, lng, mode = 'w') => {
  const modeMappingApp = {
    'driving': 'd',  // Google Maps app uses 'd' for driving
    'walking': 'w',  // Google Maps app uses 'w' for walking
    'bicycling': 'bicycling',
    'transit': 'transit',
    'bus': 'transit', // Specifying 'transit' as the mode for bus in native app
  };

  const modeMappingWeb = {
    'driving': 'driving',
    'walking': 'walking',
    'bicycling': 'bicycling',
    'transit': 'transit',
    'bus': 'transit', // Web also uses 'transit' for bus
  };

  const modeParamApp = modeMappingApp[mode] || 'd'; // Default to driving if mode is not recognized for native apps
  const modeParamWeb = modeMappingWeb[mode] || 'driving'; // Default to driving for web

  if (mode === 'transit') {
    const moovitUrl = `moovit://directions?dest_lat=${lat}&dest_lon=${lng}&travelMode=publicTransport`;
    // Try to open Moovit for transit
    Linking.openURL(moovitUrl).catch(err => {
      // If Moovit fails to open, fallback to Google Maps
      // Alert.alert("Error", "Moovit app not installed, trying Google Maps instead.");
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
      Linking.openURL(webUrl).catch(err => {
        Alert.alert("Error", "Unable to open Google Maps in a browser.");
      });
    }
  }).catch(err => {
    Alert.alert("Error", "An error occurred while trying to open the map.");
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
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Ensure we're working with an array for both old and new structures
  if (!Array.isArray(openHoursArray)) {
    // If openHoursArray is not an array, assume it's the old single object structure
    openHoursArray = [openHoursArray]; // Wrap it in an array for compatibility
  }

  // Function to format a single openHours object
  const formatSingleOpenHours = (openHours) => {
    if (openHours.days.length === 7 && openHours.days.every((val, i) => val === i)) {
      return `Everyday \n${formatTime(openHours.open)} - ${formatTime(openHours.close)}`;
    }
  
    let daysFormatted = openHours.days.reduce((acc, day, index, arr) => {
      if (index > 0 && day - arr[index - 1] === 1) {
        acc[acc.length - 1].push(day);
      } else {
        acc.push([day]);
      }
      return acc;
    }, []).map(group => {
      if (group.length > 1) {
        return `${daysOfWeek[group[0]]} - ${daysOfWeek[group[group.length - 1]]}`;
      } else {
        return daysOfWeek[group[0]];
      }
    }).join(", ");
    
    return `${daysFormatted} \n ${formatTime(openHours.open)} - ${formatTime(openHours.close)}`;
  };

  // Iterate over each openHours object, format it, and combine the results
  return openHoursArray.map(formatSingleOpenHours).join("\n\n");
};

// Convert 24-hour format to 12-hour format
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const isPM = hours >= 12;
  const formattedHours = ((hours + 11) % 12 + 1);
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${isPM ? 'pm' : 'am'}`;
};

export const updateLocationStatus = (openHoursArray) => {
  const now = moment();
  const dayOfWeek = now.day(); // Sunday as 0 through Saturday as 6
  let currentOpenHours = null;

  // Find open hours for today
  for (const openHours of openHoursArray) {
    if (openHours.days.includes(dayOfWeek)) {
      currentOpenHours = openHours;
      break;
    }
  }

  let status = '', time = '';


  if (currentOpenHours) {
    const openTime = moment(currentOpenHours.open, "HH:mm");
    const closeTime = moment(currentOpenHours.close, "HH:mm");
    const closingSoonTime = moment(closeTime).subtract(1, 'hours');

    // Determine status based on current time if open today
    if (now.isBetween(openTime, closingSoonTime)) {
      status = 'open';
      time = formatTime(currentOpenHours.close);
    } else if (now.isBetween(closingSoonTime, closeTime)) {
      status = 'closingSoon';
      time = formatTime(currentOpenHours.close);
    } else if (now.isBefore(openTime) && now.isAfter(moment(openTime).subtract(1, 'hours'))) {
      status = 'openingSoon';
      time =  "Today " + formatTime(currentOpenHours.open);
    } else if (now.isBefore(openTime)) {
      status = 'closed';
      time = "Today " + formatTime(currentOpenHours.open); // Fix to explicitly state "Today"
    } else {
      status = 'closed';
      // For when it's past close time today, handled in the next section
    }
  }


  // If closed or not open today, find the next open day
  if (!currentOpenHours || (status === 'closed' && !time.startsWith("Today"))) {
    const allDays = openHoursArray.reduce((acc, {days}) => [...acc, ...days], []);
    if (allDays.length === 1 && allDays[0] === dayOfWeek) {
      // If today is the only day it opens and it's already past closing time
      time = moment().day(dayOfWeek).format('dddd') + ' ' + formatTime(currentOpenHours.open);
    } else {
      let nextDayIndex = allDays.findIndex(day => day > dayOfWeek);
      if (nextDayIndex === -1) { // No more days this week, wrap to next
        nextDayIndex = 0; // Start from the first day in the next week
      }
      const nextDay = allDays.sort()[nextDayIndex];
      const daysUntilNextOpen = (nextDay + 7 - dayOfWeek) % 7;
      const nextOpenDate = now.clone().add(daysUntilNextOpen, 'days');
      const nextOpenDayFormatted = nextOpenDate.calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        sameElse: 'dddd'
      });
      const nextOpenHours = openHoursArray.find(oh => oh.days.includes(nextOpenDate.day()));

      time = `${nextOpenDayFormatted} ${formatTime(nextOpenHours.open)}`;
    }
    status = 'closed';
    return { status, message: `Opens `, time };
  }

  // Constructing the message based on status
  let message = status === 'open' || status === 'closingSoon' ? `Closes ` : `Opens `;

  return { status, message, time };
};


// export const getStatusIndicatorStyle = (status) => {
//   switch (status) {
//     case 'closingSoon':
//       return { backgroundColor: '#ffe8ad' };
//     case 'openingSoon':
//       return { backgroundColor: '#c1fcbb' };
//     case 'open':
//       return { backgroundColor: '#c1fcbb' };
//     case 'closed':
//       return { backgroundColor: '#ffd1d1' };
//     default:
//       return {};
//   }
// };

// export const getStatusTextStyleColor = (status) => {
//   switch (status) {
//     case 'closingSoon':
//       return '#543c00';
//     case 'openingSoon':
//       return '#075400';
//     case 'open':
//       return '#075400';
//     case 'closed':
//       return 'darkred';
//     default:
//       return 'white'; // Default color if none of the statuses match
//   }
// };

// export const getStatusText = (status) => {
//   switch (status) {
//     case 'closingSoon':
//       return 'Closes Soon';
//     case 'openingSoon':
//       return 'Opens Soon';
//     case 'open':
//       return 'Open';
//     case 'closed':
//       return 'Closed';
//     default:
//       return '';
//   }
// };

//Combined function
export const getStatusStyles = (status) => {
  let backgroundColor, textColor, text;
  
  switch (status) {
    case 'closingSoon':
      backgroundColor = '#ffe8ad';
      textColor = '#543c00';
      text = 'Closes Soon';
      break;
    case 'openingSoon':
      backgroundColor = '#c1fcbb';
      textColor = '#075400';
      text = 'Opens Soon';
      break;
    case 'open':
      backgroundColor = '#c1fcbb';
      textColor = '#075400';
      text = 'Open';
      break;
    case 'closed':
      backgroundColor = '#ffd1d1';
      textColor = 'darkred';
      text = 'Closed';
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
    statusText: text
  };
};
