// This Page is developed to fit Grand Rapids environment, where 
// "God’s Kitchen" is for lunch and "Mel Trotter" is for dinner.
// These two locations are the only locations we know that doesn't require payments for food.  
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
import { useFonts } from 'expo-font';
import { getUserLocation, getDistance, formatTime } from '../utils';
import locationsBasic from '../database/locations_basic.json';

const Page = () => {
  const navigation = useNavigation();
  const [godsKitchenDistance, setGodsKitchenDistance] = useState(null);
  const [melTrotterDistance, setMelTrotterDistance] = useState(null);
  const [today, setToday] = useState(new Date().getDay()); // Sunday - 0, Monday - 1, ..., Saturday - 6

  // Access the first entry of openHours as it's now an array
  const melTrotterLocation = locationsBasic.Meal.find(location => location.id === "2");
  const godsKitchenLocation = locationsBasic.Meal.find(location => location.id === "1");


  useEffect(() => {
    (async () => {
      const userLocation = await getUserLocation();
      if (!userLocation) {
        console.log("Could not fetch user location.");
        return;
      }

      const distanceToMelTrotter = getDistance(userLocation.latitude, userLocation.longitude, melTrotterLocation.coordinates.lat, melTrotterLocation.coordinates.lng);
      const distanceToGodsKitchen = getDistance(userLocation.latitude, userLocation.longitude, godsKitchenLocation.coordinates.lat, godsKitchenLocation.coordinates.lng);

      setMelTrotterDistance((distanceToMelTrotter * 0.621371).toFixed(1)); // Convert km to miles and round to 1 decimal place
      setGodsKitchenDistance((distanceToGodsKitchen * 0.621371).toFixed(1));
    })();
  }, []);

    // Helper function to determine if a location is open today
    const isOpenToday = (location) => {
      return location.openHours.some(oh => oh.days.includes(today));
    };
  
    // Helper function to render open hours or "Closed Today"
    const renderOpenHours = (location) => {
      if (isOpenToday(location)) {
        const todayHours = location.openHours.find(oh => oh.days.includes(today));
        return (
          <>
            <Text style={styles.IconButtonTextBold}>{formatTime(todayHours?.open)}</Text>
            <Text style={styles.IconButtonText}> - </Text>
            <Text style={styles.IconButtonTextBold}>{formatTime(todayHours?.close)}</Text>
          </>
        );
      } else {
        return <Text style={styles.IconButtonTextBold}>Closed Today</Text>;
      }
    };
  

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
              subtitle: "Lunch Location: "
            });
          }}
        >
          <View style={styles.row}>
            <Text style={styles.IconButtonText}>Lunch</Text>
            {renderOpenHours(godsKitchenLocation)}
          </View>
          <Image source={ require('../assets/arrow_forward.png') } style={[styles.arrow]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.IconButton}
          onPress={() => {
            const melTrotter = locationsBasic.Meal.find(location => location.id === "2");
            navigation.navigate('ResourceLocation', {
              location: melTrotter,
              category: "Meal",
              distance: melTrotterDistance,
              subtitle: "Dinner Location: "
            });
          }}
        >
          <View style={styles.row}>
            <Text style={styles.IconButtonText}>Dinner</Text>
            {renderOpenHours(melTrotterLocation)}
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
    width: '80%',
  },
  textContainer: {
    fontSize: 15, 
  },
  IconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
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
    width: '95%',
  },

});