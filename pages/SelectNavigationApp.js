/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import * as Location from 'expo-location'
// import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locations from '../locationsData';
import { openGoogleMaps } from '../utils'
// import * as styles from '../../styles/detailsStyles';


const SelectNavigationApp = ({ onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { location, mode } = route.params;

  const handleOpenGoogleMaps = (mode) => {
    openGoogleMaps(location.coordinates.lat, location.coordinates.lng, mode);
  };

  const openMoovit = () => {
    const lat = location.coordinates.lat; // latitude for destination
    const lon = location.coordinates.lng; // longitude for destination
    const travelMode = 'publicTransport'; // Mode of transit, could be 'publicTransport', 'bike', etc.
    const url = `moovit://directions?dest_lat=${lat}&dest_lon=${lon}&travelMode=${travelMode}`;
  
    Linking.openURL(url).catch(err => {
      console.error('Failed to open URL:', err);
    });
  };
  

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>{location.name} by {mode}</Text>
            <View style={styles.row}>
              <Text style={styles.title}>Select Navigation App</Text>
            </View>
            {/* <Text style={styles.coordinates}>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</Text> */}
          </View>

          <View style={styles.resourceContainer}>
            <IconButton
              // imageSource={require('../assets/walk.png')}
              title="Use Moovit"
              buttonStyle={styles.primaryButton}
              onPress={openMoovit} // 'w' for walking
            />

            <IconButton
              // imageSource={require('../assets/subway.png')}
              title="Use Google Maps"
              buttonStyle={styles.primaryButton}
              onPress={() => handleOpenGoogleMaps(mode)} // 'bus' for public transit (handled as 'transit' in the function)
            />

            <IconButton
              imageSource={require('../assets/car.png')}
              title="Drive"
              buttonStyle={styles.primaryButton}
              onPress={() => handleOpenGoogleMaps('driving')} // 'd' for driving
            />
          </View>

          <View style={styles.resourceContainer}>

            <GoBackButton/>

            {/* <ActionButton
              title="Call Navigator"
              onPress={onClose}
              buttonStyle={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            /> */}

          </View>

        </View>
  );
};

export default SelectNavigationApp;

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
    width: '80%',
  },
  textContainer: {
    fontSize: 15, 
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '100%',
  },
  subtitle2: {
    marginBottom: 10,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#E2E9F3',
  },

  title: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems:'center',
    paddingBottom: 5
  },
  indicator: {
    backgroundColor: '#fce9c0',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    color: '#664501',
    fontFamily: 'Manrope-Bold',
  },
  timing: {
    marginLeft: 5,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Medium',
  },

});