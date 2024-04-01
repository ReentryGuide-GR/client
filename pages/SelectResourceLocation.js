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
      <View style={styles.resourceContainer}>
        <Text style={styles.title}>Select {category} Location</Text>
        <ActionButton
          imageSource={require('../assets/bullseye.png')}
          title="Select Closest Location"
          buttonStyle={styles.secondaryButton}
          onPress={handleSelectClosestLocation}
        />

        <ActionButton
          imageSource={require('../assets/locations.png')}
          iconSize={40}
          buttonPadding={18}
          title="Select Other Locations"
          onPress={onClose}
          buttonStyle={styles.tertiaryButton}
          textStyle={styles.tertiaryButtonText}
        />
      </View>

      <View style={styles.resourceContainer}>

        <GoBackButton/>

        <ActionButton
          title="Call Navigator"
          onPress={onClose}
          buttonStyle={styles.primaryButton}
          textStyle={styles.primaryButtonText}
        />

      </View>

    </View>
  );
};

export default SelectResourceLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    width: '100%',
    height: '100%',
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
    backgroundColor: '#A33636',
  },

  secondaryButton: {
    backgroundColor: '#505967',
  },
  
  secondaryButtonText: {
    color: '#fff',
  },

  tertiaryButton: {
    backgroundColor: '#E2E9F3',
  },

  tertiaryButtonText: {
    color: '#000',
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '78%',
  },

});