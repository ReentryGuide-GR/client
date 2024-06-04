import React, { useEffect } from 'react';
import {
  StyleSheet, View, Text, Linking, AppState,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';

const Page = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  useEffect(() => {
    const checkPermissionAndNavigate = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        navigation.navigate('MainMenu');
      }
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkPermissionAndNavigate();
      }
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Unsubscribe to the app state changes when the component unmounts
      subscription.remove();
    };
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top,
      easier for user to reach */}
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.subtitle}>ReentryGuide GR</Text>
        <Text style={styles.title} allowFontScaling={false}>Request permission</Text>
        <IconButton
          // imageSource={require('../assets/meal.png')}
          title="Grant Permission"
          buttonStyle={styles.primaryButton}
          iconSize={0}
          onPress={() => Linking.openSettings()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>1. Click &quot;Grant Permission&quot;</Text>
          <Text style={styles.text}>2. Click &quot;Permissions&quot;</Text>
          <Text style={styles.text}>3. Click &quot;Location&quot;</Text>
          <Text style={styles.text}>4. Click &quot;Allow all the time&quot;</Text>
        </View>
      </View>

      <View />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
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
