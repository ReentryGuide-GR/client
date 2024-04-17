//SelectResoureLocation.js 
import React , { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
// import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locations from '../locationsData';
import { findClosestLocation } from '../utils';
// import * as styles from '../../styles/detailsStyles';

const SelectResourceLocation = ({ isVisible, onClose }) => {

  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { category, title } = route.params; // Access the passed category
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectClosestLocation = async () => {
    setIsLoading(true); // Start loading
    const result = await findClosestLocation(category);
    setIsLoading(false); // End loading
    if (result) {
      const { location, distance } = result;
      // Convert kilometers to miles
      const distanceInMiles = distance * 0.621371;
      navigation.navigate('ResourceLocation', { 
        location: location, 
        distance: parseFloat(distanceInMiles.toFixed(1)), // Ensure distance is rounded to 1 decimal place for display
        category, 
        subtitle: `Closest ${title} Location: `
      });
    } else {
      console.error("No closest location found");
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top, easier for user to reach*/}
      <View></View> 
      <View style={styles.resourceContainer}>
        <Text style={styles.title}>Select {"\n"}{title} Location</Text>
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
          onPress={() => navigation.navigate('LocationsList', {category})}
        />
      </View>

      <View style={styles.resourceContainer}>
        <GoBackButton/>
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
    backgroundColor: '#E2E9F3',
    padding: 25,
  },
  
  secondaryButtonText: {
    color: '#000',
  },

  tertiaryButton: {
    backgroundColor: '#E2E9F3',
    padding: 22,
  },

  tertiaryButtonText: {
    color: '#000',
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
    textAlign: 'center'
  },

});