/* eslint-disable */
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
// import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locationsData from './database/locations_basic.json';
// import * as styles from '../../styles/detailsStyles';


const Page = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  
  useEffect(() => {
    const checkPermissionAndNavigate = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        navigation.navigate('MainPage'); // Replace 'MainPage' with your main menu screen name if it's different
      }
    };

    checkPermissionAndNavigate();
  }, [navigation]); // Dependency array includes navigation to avoid re-running this effect unnecessarily

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  
return (

        <View style={styles.mainContainer}>
          {/* Empty Component to make buttons in the middle of the screen but not on top, easier for user to reach*/}
          <View></View> 
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>ReentryGuide GR</Text>
            <Text style={styles.title}>Request permission</Text>
            <IconButton
              // imageSource={require('../assets/meal.png')}
              title="Grant Permission"
              buttonStyle={styles.primaryButton}
              iconSize={0}
              onPress={() => Linking.openSettings()}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>1. Click "Grant Permission"</Text>
              <Text style={styles.text}>2. Click "Permissions"</Text>
              <Text style={styles.text}>3. Click "Location"</Text>
              <Text style={styles.text}>4. Click "Allow all the time"</Text>
            </View>
          </View>

          <View>
          </View>

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
  primaryButton: {
    backgroundColor: '#E2E9F3',
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
  textContainer: {
    width: '95%',
    marginTop: 38,
  }
});