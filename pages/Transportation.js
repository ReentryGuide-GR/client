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


const Transportation = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { location } = route.params;

  const handlePlanYourRoute = (mode) => {
    openGoogleMaps(location.lat, location.lng, mode);
  };

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>Closest food location:</Text>
            <Text style={styles.title}>{location.name}</Text>
            {/* <Text style={styles.title}>Location Name</Text> */}
          </View>

          <View style={styles.resourceContainer}>
           <Text style={styles.subtitle}>How will you get there?</Text>
            <IconButton
              imageSource={require('../assets/walk.png')}
              title="Walk only"
              onPress={() => handlePlanYourRoute('w')} // 'w' for walking
            />

            <IconButton
              imageSource={require('../assets/subway.png')}
              title="Bus and Walk"
              onPress={() => handlePlanYourRoute('bus')} // 'bus' for public transit (handled as 'transit' in the function)
            />

            <IconButton
              imageSource={require('../assets/car.png')}
              title="Drive"
              onPress={() => handlePlanYourRoute('d')} // 'd' for driving
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

export default Transportation;

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
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 18,
    fontWeight: '500',
    width: '78%',
    fontFamily: 'Manrope-SemiBold',
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