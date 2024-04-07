// This Page is developed to fit Grand Rapids environment, where 
// "God’s Kitchen" is for lunch and "Mel Trotter" is for dinner.
// These two locations are the only locations we know that doesn't require payments for food.  
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
import { useFonts } from 'expo-font';
import { getUserLocation, getDistance } from '../utils';
import locationsBasic from '../database/locations_basic.json';


const Page = ({ onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [godsKitchenDistance, setGodsKitchenDistance] = useState(null);
  const [melTrotterDistance, setMelTrotterDistance] = useState(null);

  

  useEffect(() => {
    (async () => {
      const userLocation = await getUserLocation();
      if (!userLocation) {
        console.log("Could not fetch user location.");
        return;
      }

      const melTrotterLocation = locationsBasic.Meal.find(location => location.id === "2");
      const godsKitchenLocation = locationsBasic.Meal.find(location => location.id === "1");

      const distanceToMelTrotter = getDistance(userLocation.latitude, userLocation.longitude, melTrotterLocation.coordinates.lat, melTrotterLocation.coordinates.lng);
      const distanceToGodsKitchen = getDistance(userLocation.latitude, userLocation.longitude, godsKitchenLocation.coordinates.lat, godsKitchenLocation.coordinates.lng);

      // Choose which location you want to calculate distance for and set it
      // For example, if this screen is meant for deciding on dinner:
      setMelTrotterDistance((distanceToMelTrotter * 0.621371).toFixed(1)); // Convert km to miles and round to 1 decimal place
      setGodsKitchenDistance((distanceToGodsKitchen * 0.621371).toFixed(1)); // Convert km to miles and round to 1 decimal place
    })();
  }, []);

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

return (

        <View style={styles.mainContainer}>
          {/* Empty Component to make buttons in the middle of the screen but not on top, easier for user to reach*/}
          <View></View> 
          <View style={styles.resourceContainer}>
            <Text style={styles.title}>Lunch or Dinner?</Text>

            <TouchableOpacity
              style={styles.IconButton}
              onPress={() => {
                const godsKitchen = locationsBasic.Meal.find(location => location.id === "1");
                navigation.navigate('ResourceLocation', {
                  location: godsKitchen,
                  category: "Meal",
                  distance: godsKitchenDistance,
                });
              }}
            >
              <View style={styles.row}>
                <Text style={styles.IconButtonText}>Lunch</Text>
                <Text style={styles.IconButtonTextBold}>4:00</Text>
                <Text style={styles.IconButtonText}>pm -</Text>
                <Text style={styles.IconButtonTextBold}>5:45</Text>
                <Text style={styles.IconButtonText}>pm</Text>
              </View>
              <Image source={ require('../assets/arrow_forward.png') } style={[styles.arrow]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.IconButton}
              onPress={() => {
                const melTrotter = locationsBasic.Meal.find(location => location.id === "2"); // Assuming "2" is Mel Trotter
                navigation.navigate('ResourceLocation', {
                  location: melTrotter,
                  category: "Meal",
                  distance: melTrotterDistance,
                });
              }}
            >
              <View style={styles.row}>
                <Text style={styles.IconButtonText}>Dinner</Text>
                <Text style={styles.IconButtonTextBold}>12:30</Text>
                <Text style={styles.IconButtonText}>pm -</Text>
                <Text style={styles.IconButtonTextBold}>2:00</Text>
                <Text style={styles.IconButtonText}>pm</Text>
              </View>
              <Image source={ require('../assets/arrow_forward.png') } style={[styles.arrow]} />
            </TouchableOpacity>

          </View>

          <View style={styles.resourceContainer}>

            <GoBackButton/>

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
    width: '100%',
  },
  textContainer: {
    fontSize: 15, 
  },
  IconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderRadius: 20,
    width: '80%',
    padding: 21,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#E2E9F3',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
    zIndex: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  arrow: {
    marginRight: 0,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  IconButtonText: {
    fontFamily: 'Manrope-SemiBold',
    letterSpacing: 0.3,
    fontSize: 18,
    color: '#333',
    marginLeft: 5,
  },
  IconButtonTextBold: {
    fontFamily: 'Manrope-ExtraBold',
    letterSpacing: 0.3,
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '80%',
  },

});