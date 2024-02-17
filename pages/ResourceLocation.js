/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import ResourceButton from '../components/ResourceButton';
import locations from '../locationsData';
import { useFonts } from 'expo-font';
// import * as styles from '../../styles/detailsStyles';


const Menu = ({ isVisible, onClose }) => {

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>Closest food location:</Text>
            <Text style={styles.title}>Mel Trotter Ministries</Text>
          </View>

          <View style={styles.resourceContainer}>
            <ActionButton
              title="Plan Your Route"
              buttonStyle={styles.secondaryButton}
              onPress={() => findClosestLocation('Meal')}
            />

            <ActionButton
              title="More Info"
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

  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 18,
    fontWeight: '500',
    width: '78%',
    fontFamily: 'Manrope-SemiBold',
  },
  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '78%',
  },

});