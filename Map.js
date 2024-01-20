//Map.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Menu from './Menu';
import ActionButton from './components/ActionButton';
import * as Location from 'expo-location';

export default function Map() {
  const navigation = useNavigation()
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

  return (
    <SafeAreaView style={styles.container}>
      <Menu isVisible={isMenuVisible} onClose={toggleMenu} />
      <ActionButton
        title="Find Resources"
        onPress={toggleMenu}
        buttonStyle={styles.secondaryButton}
      />
      <View
        style={{
          borderRadius: 24,
          overflow: "hidden",
          height: '100%',
          width: '100%',
          flex: 1,
          backgroundColor: '#ffaaaa'
        }}
      > 
        <MapView 
          provider={PROVIDER_GOOGLE} // If you want to use Google Maps
          style={styles.map}
          showsUserLocation={true}
          mapType="standard" // Do not use satellite view
          userLocationUpdateInterval={1000}  // Update every 1 seconds
          userLocationPriority="high"  
          region={region}
        />
      </View>

      <ActionButton
        title="Call Navigator"
        onPress={() => { /* Your action here */ }}
        buttonStyle={styles.primaryButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff'
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
});
