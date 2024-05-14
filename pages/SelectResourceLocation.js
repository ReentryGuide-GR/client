// SelectResourceLocation.js
import React, { useState } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import * as Location from 'expo-location';
// import * as SplashScreen from 'expo-splash-screen';
// import ActionButton from '../components/ActionButton';
// import GoBackButton from '../components/GoBackButton';
import RetryScreen from '../components/RetryScreen';
import LoadingScreen from '../components/LoadingScreen';
import IconButton from '../components/IconButton';
// import locations from '../locationsData';
import { findClosestLocation } from '../utils';
// import * as styles from '../../styles/detailsStyles';

const SelectResourceLocation = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { category, title } = route.params; // Access the passed category
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const handleSelectClosestLocation = async () => {
    setIsLoading(true);
    setIsOffline(false); // Reset the offline status each time the user tries
    try {
      const result = await findClosestLocation(category);
      if (result) {
        const { location, distance } = result;
        navigation.navigate('ResourceLocation', {
          location,
          distance: parseFloat(distance * 0.621371).toFixed(1),
          category,
          subtitle: `Closest ${title} Location: `,
        });
      } else {
        // console.error(`No closest location found for category: ${category}`);
        // Alert.alert('Error', 'No closest location found. Please try again later.');
        setIsOffline(true);
      }
    } catch (error) {
      console.error('Failed to find location:', error);
      setIsOffline(true); // Set the offline status if an error occurs
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
        <Text style={styles.title}>
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
          onPress={() => navigation.navigate('LocationsList', { category, title })}
        />
      </View>

      <View style={styles.resourceContainer}>
        {/* <GoBackButton /> */}
      </View>

    </View>
  );
};

export default SelectResourceLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
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
    backgroundColor: '#eae0d4',
    padding: 25,
  },

  secondaryButtonText: {
    color: '#000',
  },

  tertiaryButton: {
    backgroundColor: '#eae0d4',
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
