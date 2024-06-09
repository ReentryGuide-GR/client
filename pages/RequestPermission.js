// import React, { useEffect, useState, useRef } from 'react';
import React from 'react';
import {
  // StyleSheet, View, Text, Linking, AppState,
  StyleSheet, View, Text, Linking,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';

const RequestPermission = () => {
  // const navigation = useNavigation(); // used for navigation.navigate()
  // const appState = useRef(AppState.currentState);
  // const hasNavigated = useRef(false); // Add this line

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  // const checkPermissionAndNavigate = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === 'granted') {
  //     if (!hasNavigated.current) { // Add this check
  //       hasNavigated.current = true; // Set the flag
  //       navigation.navigate('MainMenu');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //       checkPermissionAndNavigate();
  //     }
  //     appState.current = nextAppState;
  //   };

  //   const subscription = AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <View style={styles.mainContainer}>
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.subtitle}>ReentryGuide GR</Text>
        <Text style={styles.title} allowFontScaling={false}>Location permission</Text>
        <IconButton
          title="Grant Permission"
          buttonStyle={styles.primaryButton}
          iconSize={0}
          onPress={() => Linking.openSettings()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>1. Click &quot;Grant Permission&quot;</Text>
          <Text style={styles.text}>2. Click &quot;Permissions&quot;</Text>
          <Text style={styles.text}>3. Click &quot;Location&quot;</Text>
          <Text style={styles.text}>4. Click &quot;Allow only while using the app&quot;</Text>
          <Text style={styles.text}>5. Restart the App</Text>
        </View>
      </View>
      <View />
    </View>
  );
};

export default RequestPermission;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    fontSize: 15,
    width: '95%',
    marginTop: 38,
  },
  primaryButton: {
    backgroundColor: '#FDDEBA',
  },
  title: {
    marginBottom: 38,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '95%',
  },
  text: {
    marginVertical: 4,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
  },
});
