import React, { useState, useEffect, useRef } from 'react';

import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Menu from './Menu';
import ActionButton from './components/ActionButton';

const Map = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const MyLocationButton = ({ onMyLocation }) => {
    return (
      <TouchableOpacity onPress={onMyLocation} style={styles.myLocationButton}>
        <Text style={styles.myLocationButtonText}>My Location</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Menu isVisible={isMenuVisible} onClose={toggleMenu} />
      <ActionButton
        title="Find Resources"
        onPress={toggleMenu}
        buttonStyle={styles.secondaryButton}
      />
      <View style={styles.mapContainer}>
        <MapView 
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={false}
          mapType="standard"
          userLocationUpdateInterval={1000}
          userLocationPriority="high"
          region={region}

        />
        <MyLocationButton onMyLocation={() => {
          if (region && mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
          }
        }} />
      </View>
      <ActionButton
        title="Call Navigator"
        onPress={() => { /* Your action here */ }}
        buttonStyle={styles.primaryButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  mapContainer: {
    borderRadius: 24,
    overflow: "hidden",
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#ffaaaa',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  primaryButton: {
    backgroundColor: '#A33636',
    position: 'absolute',
    bottom: 30,
    zIndex: 11,
  },
  secondaryButton: {
    backgroundColor: '#222',
    position: 'absolute',
    top: 30,
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 180,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
  },
  myLocationButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Map;
