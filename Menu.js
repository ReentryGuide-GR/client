/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from './components/ActionButton';
import ResourceButton from './components/ResourceButton';
import locations from './locationsData';
// import * as styles from '../../styles/detailsStyles';


//Get Distance from each resource location to the user location
const getDistance = (lat1, lng1, lat2, lng2) => {
  // Haversine formula
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const findClosestLocation = async (category) => {
  let userLocation = await getUserLocation();
  if (!userLocation) {
    Alert.alert("Error", "Unable to get user location");
    return;
  }

  const closest = locations[category].reduce((prev, curr) => {
    const prevDistance = getDistance(userLocation.latitude, userLocation.longitude, prev.lat, prev.lng);
    const currDistance = getDistance(userLocation.latitude, userLocation.longitude, curr.lat, curr.lng);
    return (prevDistance < currDistance) ? prev : curr;
  });

  openGoogleMaps(closest.lat, closest.lng);
};


const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    console.error("Couldn't get location", error);
    return null;
  }
};

const openGoogleMaps = (lat, lng) => {
  // Use the geo URI scheme for Android
  const url = Platform.OS === 'android' 
    ? `google.navigation:q=${lat},${lng}&mode=w` // 'w' stands for walking
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;

  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const Menu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.title}>What do you need?</Text>
            <ResourceButton
              imageSource={require('./assets/food.png')}
              title="Food"
              onPress={() => navigation.navigate('SelectFoodLocationPage')}
            />
            <ResourceButton
              imageSource={require('./assets/clothing.png')}
              title="Clothing"
              onPress={onClose}
            />
            <ResourceButton
              imageSource={require('./assets/drop.png')}
              title="Hygiene"
              onPress={onClose}
            />
            <ResourceButton
              imageSource={require('./assets/med.png')}
              title="Healthcare"
              onPress={onClose}
            />

            <ActionButton
              title="More..."
              onPress={onClose}
              buttonStyle={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          </View>

          <ActionButton
            title="Call Navigator"
            onPress={onClose}
            buttonStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />

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


  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
  },

});