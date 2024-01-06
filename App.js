//App.js
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function App() {
  // const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Find Resources</Text>
      </TouchableOpacity>
      <MapView 
        provider={PROVIDER_GOOGLE} // If you want to use Google Maps
        style={styles.map}
        mapType="standard" // Do not use satellite view
        region={{
          latitude: 42.9634,  // Latitude for Grand Rapids
          longitude: -85.6681, // Longitude for Grand Rapids
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity style={styles.primaryButton} >
        <Text style={styles.buttonText}>Call Navigator</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#A33636',
    borderRadius: 50,
    width: '80%',
    padding: 18,
    marginVertical: 20,
    position: 'absolute',
    bottom: 10,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,
    zIndex: 11,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginVertical: 20,
    position: 'absolute',
    top: 30,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,
    zIndex: 11,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
});
