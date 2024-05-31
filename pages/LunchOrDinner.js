// This Page is developed to fit Grand Rapids environment, where
// "God’s Kitchen" is for lunch and "Mel Trotter" is for dinner.
// These two locations are the only locations we know that doesn't require payments for food.
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { getUserLocation, getDistance, formatTime } from '../utils';
import LoadingScreen from '../components/LoadingScreen';
import RetryScreen from '../components/RetryScreen';
import locationsBasic from '../database/locations_basic.json';

const LunchOrDinner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [retryFunction, setRetryFunction] = useState(null);
  const navigation = useNavigation();
  // Sunday - 0, Monday - 1, ..., Saturday - 6
  const [today] = useState(new Date().getDay());

  // Access the first entry of openHours as it's now an array
  const melTrotterLocation = locationsBasic.meal.find((location) => location.id === '2');
  const godsKitchenLocation = locationsBasic.meal.find((location) => location.id === '1');

  const handleLunchPress = async () => {
    setIsLoading(true);
    setIsOffline(false); // Reset offline status at the beginning of the operation

    try {
      const userLocation = await getUserLocation();
      if (!userLocation) {
        throw new Error('Unable to retrieve user location');
      }

      const distanceToGodsKitchen = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        godsKitchenLocation.coordinates.lat,
        godsKitchenLocation.coordinates.lng,
      );

      const godsKitchenDistanceFormatted = (distanceToGodsKitchen * 0.621371).toFixed(1);
      navigation.navigate('ResourceLocation', {
        location: godsKitchenLocation,
        category: 'meal',
        distance: godsKitchenDistanceFormatted,
        subtitle: 'Lunch Location: ',
      });
    } catch (error) {
      console.log('Failed to get location:', error.message);
      setIsOffline(true);
      setRetryFunction(() => handleLunchPress);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDinnerPress = async () => {
    setIsLoading(true);
    const userLocation = await getUserLocation();
    if (!userLocation) {
      console.log('Could not fetch user location.');
      return;
    }
    const distanceToMelTrotter = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      melTrotterLocation.coordinates.lat,
      melTrotterLocation.coordinates.lng,
    );
    const melTrotterDistanceFormatted = (distanceToMelTrotter * 0.621371).toFixed(1);
    setIsLoading(false);

    navigation.navigate('ResourceLocation', {
      location: melTrotterLocation,
      category: 'meal',
      distance: melTrotterDistanceFormatted,
      subtitle: 'Dinner Location: ',
    });
  };

  // Helper function to determine if a location is open today
  const isOpenToday = (location) => (location.openHours.some((oh) => oh.days.includes(today)));

  // Helper function to render open hours or "Closed Today"
  const renderOpenHours = (location) => {
    if (isOpenToday(location)) {
      const todayHours = location.openHours.find((oh) => oh.days.includes(today));
      return (
        <>
          <Text style={styles.IconButtonTextBold}>{formatTime(todayHours?.open)}</Text>
          <Text style={styles.IconButtonText}> - </Text>
          <Text style={styles.IconButtonTextBold}>{formatTime(todayHours?.close)}</Text>
        </>
      );
    }
    return <Text style={styles.IconButtonTextBold}>Closed Today</Text>;
  };

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  if (isLoading) {
    return (<LoadingScreen />);
  }

  if (isOffline) {
    return (
      <RetryScreen
        retryFunction={retryFunction}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top,
      easier for user to reach */}
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.title} allowFontScaling={false}>Lunch or Dinner?</Text>

        <TouchableOpacity
          style={styles.IconButton}
          onPress={handleLunchPress}
        >
          <View style={styles.row}>
            <Text style={styles.IconButtonText}>Lunch</Text>
            {renderOpenHours(godsKitchenLocation)}
          </View>
          <Image source={require('../assets/arrow_forward.png')} style={[styles.arrow]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.IconButton}
          onPress={handleDinnerPress}
        >
          <View style={styles.row}>
            <Text style={styles.IconButtonText}>Dinner</Text>
            {renderOpenHours(melTrotterLocation)}
          </View>
          <Image source={require('../assets/arrow_forward.png')} style={[styles.arrow]} />
        </TouchableOpacity>
      </View>

      <View />
    </View>
  );
};

export default LunchOrDinner;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    fontSize: 15,
  },
  IconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    padding: 21,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#eae0d4',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
    zIndex: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    flexWrap: 'wrap',
    flex: 1,
  },
  arrow: {
    marginRight: 0,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  IconButtonText: {
    fontFamily: 'Manrope-SemiBold',
    letterSpacing: 0.3,
    fontSize: 18,
    color: '#333',
    marginLeft: 5,
  },
  IconButtonTextBold: {
    fontFamily: 'Manrope-ExtraBold',
    letterSpacing: 0.3,
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },

});
