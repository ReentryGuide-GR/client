/* eslint-disable */
import React , { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locations from '../locationsData';
import { findClosestLocation } from '../utils';
// import * as styles from '../../styles/detailsStyles';

const SelectResourceLocation = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { category } = route.params; // Access the passed category


  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectClosestLocation = async () => {
    const result = await findClosestLocation(category);
    if (result) {
      const { location, distance } = result;
      // Convert kilometers to miles
      const distanceInMiles = distance * 0.621371;
      navigation.navigate('ResourceLocation', { 
        location: location, 
        // Ensure distance is rounded to 1 decimal place for display
        distance: parseFloat(distanceInMiles.toFixed(1))
      });
    } else {
      console.error("No closest location found");
    }
  };
  
  

  // useEffect(() => {
  //   fetchClosestLocation();
  // }, [category]); // Call fetchClosestLocation when the component mounts or category changes

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top, easier for user to reach*/}
      <View></View> 
      <View style={styles.resourceContainer}>
        <Text style={styles.title}>Select {category} Location</Text>
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
          onPress={onClose}
        />
      </View>

      <View style={styles.resourceContainer}>

        <GoBackButton/>

        {/* <IconButton
          title="Call Navigator"
          onPress={onClose}
          buttonStyle={styles.primaryButton}
          textStyle={styles.primaryButtonText}
        /> */}

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
    paddingBottom: '5%',
  },
  resourceContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
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
    width: '80%',
  },

});