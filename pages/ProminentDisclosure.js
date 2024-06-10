// ProminentDisclosure.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import IconButton from '../components/IconButton'; // Adjust the import path as needed

const ProminentDisclosure = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  const handleAcknowledge = async () => {
    try {
      await AsyncStorage.setItem('hasSeenDisclosure', 'true'); // Set the flag

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        navigation.navigate('RequestPermission');
      } else {
        navigation.navigate('ImportantNotice');
      }
    } catch (error) {
      console.error('Failed to set disclosure status', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resourceContainer}>
        <Text style={styles.subtitle}>ReentryGuide GR</Text>
        <Text style={styles.title} allowFontScaling={false}>
          Location Permission
        </Text>
        <Text style={styles.text}>
          {'\n'}
          To find the distance to your chosen location,
          please let us use your current location.
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="OK"
          buttonStyle={styles.primaryButton}
          onPress={handleAcknowledge}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  text: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 17,
    color: '#2F2E41',
    width: '95%',
    fontFamily: 'Manrope-Bold',
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '95%',
  },
  title: {
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  primaryButton: {
    backgroundColor: '#FDDEBA',
  },
});

export default ProminentDisclosure;
