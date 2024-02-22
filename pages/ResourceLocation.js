/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import ResourceButton from '../components/ResourceButton';
import locations from '../locationsData';
import { openGoogleMaps } from '../utils'

// import * as styles from '../../styles/detailsStyles';


const ResourceLocation = ({ isVisible, onClose }) => {

  const route = useRoute();
  const { location } = route.params;

  const handlePlanYourRoute = () => {
    openGoogleMaps(location.lat, location.lng);
  };

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
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
            <View style={styles.row}>
              <Text style={styles.openOrClosed}>Closes Soon</Text>
              <Text style={styles.timing}> - Closes at 5:45pm</Text>
            </View>
            <ActionButton
              title="Plan Your Route"
              buttonStyle={styles.secondaryButton}
              onPress={handlePlanYourRoute}
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

export default ResourceLocation;

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
  row: {
    flexDirection: 'row',
    width: '78%',
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    color: '#AF7E00',
    fontFamily: 'Manrope-Bold',
  },
  timing: {
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Bold',
  },
});