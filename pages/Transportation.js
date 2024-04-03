/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
import locations from '../locationsData';
import { openGoogleMaps } from '../utils'
// import * as styles from '../../styles/detailsStyles';


const Transportation = ({ onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { location, distance, indicatorColor, textColor, timeMessage, statusText } = route.params;

  const handlePlanYourRoute = (mode) => {
    openGoogleMaps(location.coordinates.lat, location.coordinates.lng, mode);
  };

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>Closest food location:</Text>
            <Text style={styles.title}>{location.name}</Text>
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
                <Text style={[styles.openOrClosed, { color: textColor }]}>Appointment Required</Text> 
              </View>
            </View>
            <Text style={styles.distance}>~ {distance} miles away</Text>
            {/* <Text style={styles.coordinates}>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</Text> */}
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
                <Text style={[styles.openOrClosed, { color: textColor }]}>{statusText}</Text> 
              </View>
              <Text style={styles.timing}> - {timeMessage}</Text>
            </View>



          </View>

          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle2}>How will you get there?</Text>
            <IconButton
              imageSource={require('../assets/walk.png')}
              title="Walk only"
              buttonStyle={styles.primaryButton}
              onPress={() => handlePlanYourRoute('w')} // 'w' for walking
            />

            <IconButton
              imageSource={require('../assets/subway.png')}
              title="Bus and Walk"
              buttonStyle={styles.primaryButton}
              onPress={() => handlePlanYourRoute('bus')} // 'bus' for public transit (handled as 'transit' in the function)
            />

            <IconButton
              imageSource={require('../assets/car.png')}
              title="Drive"
              buttonStyle={styles.primaryButton}
              onPress={() => handlePlanYourRoute('d')} // 'd' for driving
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

export default Transportation;

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
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '78%',
  },
  subtitle2: {
    marginBottom: 10,
    fontSize: 17,
    color: '#2F2E41',
    width: '76%',
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '78%',
  },
  primaryButton: {
    backgroundColor: '#E2E9F3',
  },

  title: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '78%',
  },
  row: {
    flexDirection: 'row',
    width: '78%',
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
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Bold',
  },

});