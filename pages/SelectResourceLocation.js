// SelectResourceLocation.js
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RetryScreen from '../components/RetryScreen';
import LoadingScreen from '../components/LoadingScreen';
import IconButton from '../components/IconButton';
import { getUserLocation, findClosestLocation } from '../utils';

const SelectResourceLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, title } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleSelectClosestLocation = async () => {
    setIsLoading(true);
    setIsOffline(false); // Reset offline status at the beginning of the operation

    try {
      let currentLocation = userLocation; // Use existing location if already fetched

      // Fetch location if not already available or if it's the first attempt
      if (!currentLocation) {
        const fetchedLocation = await getUserLocation();
        if (!fetchedLocation) {
          throw new Error('Unable to retrieve user location'); // Ensuring we handle null location
        }
        setUserLocation(fetchedLocation); // Update state only if location is successfully retrieved
        currentLocation = fetchedLocation; // Use newly fetched location for this operation
      }

      // Proceed to find the closest location now that we have valid coordinates
      const result = await findClosestLocation(category, currentLocation);
      if (result) {
        const { location, distance } = result;
        navigation.navigate('ResourceLocation', {
          location,
          distance: parseFloat(distance * 0.621371).toFixed(1),
          category,
          subtitle: `Closest ${title} Location: `,
        });
      } else {
        Alert.alert('Error', 'No closest location found. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to find location:', error.message);
      setIsOffline(true);
      // Alert.alert('Location Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (<LoadingScreen />);
  }

  if (isOffline) {
    return (
      <RetryScreen
        retryFunction={handleSelectClosestLocation}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top,
      easier for user to reach */}
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.title} allowFontScaling={false}>
          Select
          {'\n'}
          {title}
          {' '}
          <Text>
            Location
          </Text>
        </Text>
        <IconButton
          iconSize={32}
          imageSource={require('../assets/bullseye.png')}
          title="Pick Closest Location"
          buttonStyle={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          onPress={handleSelectClosestLocation}
        />

        <IconButton
          imageSource={require('../assets/locations.png')}
          iconSize={38}
          title="Pick Other Locations"
          onPress={() => navigation.navigate('ResourceLocationsList', { category, title })}
        />
      </View>

      <View />

    </View>
  );
};

export default SelectResourceLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    fontSize: 15,
  },

  primaryButton: {
    backgroundColor: '#FDDEBA',
    padding: 25,
  },

  secondaryButtonText: {
    color: '#000',
  },

  tertiaryButton: {
    backgroundColor: '#FDDEBA',
    padding: 22,
  },

  tertiaryButtonText: {
    color: '#000',
  },

  title: {
    flexWrap: 'wrap', // Ensures text within can wrap
    flexDirection: 'row', // Aligns text in a row; default for Text, shown for clarity
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
    textAlign: 'center',
  },

});
