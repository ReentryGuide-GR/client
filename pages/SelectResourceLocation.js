/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import ResourceButton from '../components/ResourceButton';
import locations from '../locationsData';
import { findClosestLocation } from '../utils';
// import * as styles from '../../styles/detailsStyles';

const Menu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()

  const handleSelectClosestLocation = async () => {
    const closestLocation = await findClosestLocation('Meal'); // Assuming this returns the closest location object
    if (closestLocation) {
      navigation.navigate('ResourceLocation', { location: closestLocation });
    } else {
      // Handle the case where no closest location is found
      console.error("No closest location found");
    }
  };

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.title}>Select Meal Location</Text>
            <ActionButton
              title="Select Closest Location"
              buttonStyle={styles.secondaryButton}
              onPress={handleSelectClosestLocation}
            />

            <ActionButton
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

export default Menu;

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