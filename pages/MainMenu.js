/* eslint-disable */
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
// import ActionButton from './components/ActionButton';
import IconButton from '../components/IconButton';
// import locations from './locationsData';
// import * as styles from '../../styles/detailsStyles';



const MainMenu = ({}) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      navigation.navigate('RequestPermission');
      return;
    }
  
    const userLocation = await Location.getCurrentPositionAsync({});
    console.log(userLocation);
  };

  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <IconButton
              title="Call Navigator"
              onPress={() => {
                // Use the Linking API to open the phone app, empty number for now
                Linking.openURL(`tel:${''}`)
                  .catch(err => {
                    console.error('Failed to open the phone app', err);
                  });
              }}
              buttonStyle={styles.primaryButton}
              textStyle={styles.primaryButtonText}
              // arrowStyle="white"
              
            />
          </View>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>ReentryGuide GR</Text>
            <Text style={styles.title}>Main Menu</Text>
            <IconButton
              imageSource={require('../assets/food.png')}
              title=" Find Food"
              onPress={() => navigation.navigate('MealOrGroceries')}
            />
            <IconButton
              imageSource={require('../assets/clothing.png')}
              title=" Find Clothing"
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Clothing', title: 'Clothing' })}
            />
            <IconButton
              imageSource={require('../assets/drop.png')}
              title=" Find Hygiene"
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Hygiene', title: 'Hygiene'  })}
            />
            <IconButton
              imageSource={require('../assets/med.png')}
              title=" Find Healthcare"
              onPress={() => navigation.navigate('FindHealthcare')}
            />

          </View>
          {/* Placeholder for space at the bottom */}
          <View></View> 

        </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
    width: '100%',
  },
  resourceContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    fontSize: 15, 
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '90%',
  },
  primaryButton: {
    backgroundColor: '#FFCBCB',
  },
  primaryButtonText: {
    color: '#000',
  },

  secondaryButton: {
    backgroundColor: '#E2E9F3',
  },
  
  secondaryButtonText: {
    color: '#000',
  },
  
  textContainer: {
    alignItems: 'left'
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '90%',
  },

});