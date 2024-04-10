/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import GoBackButton from '../components/GoBackButton';
import locationsBasic from '../database/locations_basic.json';
import locationsDetails from '../database/locations_details.json';
import { getDistance, findClosestLocation, getUserLocation, requirementsColorMapping, updateLocationStatus, getStatusStyles } from '../utils';

// Sample data array


const LocationList = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { category } = route.params;
  const [data, setData] = useState([]);

  // Initialize state for status and time message
  const [status, setStatus] = useState('');

  


  useEffect(() => {
    const fetchAndMergeData = async () => {
      const userLocation = await getUserLocation();
      const categoryData = locationsBasic[category];
  
      if (categoryData) {
        const mergedData = categoryData.map(location => {
          const details = locationsDetails[category].find(detail => detail.id === location.id) || {};
          const distance = userLocation ? getDistance(userLocation.latitude, userLocation.longitude, location.coordinates.lat, location.coordinates.lng) : 'N/A';
          const colorMapping = requirementsColorMapping(details.requirementsColor);
          const statusDetails = updateLocationStatus(location.openHours);
          const statusStyles = getStatusStyles(statusDetails.status); // This line is updated
          

        
          return { 
            ...location, 
            ...details, 
            ...colorMapping, 
            distance: typeof distance === 'number' ? distance.toFixed(1) : distance,
            ...statusDetails, 
            ...statusStyles // Spread the styles directly into the object

          };
        });
        
        setData(mergedData);
      } else {
        console.warn(`No data found for category: ${category}`);
        setData([]);
      }
    };
  
    fetchAndMergeData();
  }, [category]);
  
  
  
  

  const [fontsLoaded] = useFonts({
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }



  
  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <View style={[styles.indicator, { backgroundColor: item.backgroundColor }]}>
            <Text style={[styles.requirementText, { color: item.textColor }]}>{item.requirementsText}</Text>
          </View>
        </View>
        <Text style={styles.distance}>
          ~ <Text style={{ fontFamily: 'Manrope-Bold', }}>{item.distance}</Text> miles away
        </Text>
        <View style={styles.row}>
          <View style={[styles.indicator, item.statusBackgroundColor]}>
            <Text style={[styles.openOrClosed, { color: item.statusTextStyleColor }]}>{item.statusText}</Text>
          </View>
          <Text style={styles.timing}>
            {item.message}<Text style={{ fontFamily: 'Manrope-Bold', }}>{item.time}</Text>
          </Text>
      </View>
      </View>
      <IconButton
        title="Select"
        onPress={onClose}
        iconSize={0}
        buttonStyle={styles.secondaryButton}
      />
    </View>
    </View>
  );

return (

        <View style={styles.mainContainer}>
          <Text style={styles.pageTitle}>Select {category} Location</Text>


          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ 
              width: '100%',
              paddingBottom: 120, // Adjust this value based on the height of your resourceContainer
            }}
          />
          <View style={styles.resourceContainer}>
            <View style={styles.buttonContainer}>
              <GoBackButton/>
            </View>
          </View>

        </View>
  );
};

export default LocationList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  pageTitle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    paddingBottom: 15,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    // width: '95%',
    marginHorizontal: '10%',
    // position: 'absolute',
    top: 0
  },
  listContainer: {
    alignItems: 'center',
    // backgroundColor: '#ff5555',
    width: '100%'
  },
  resourceContainer: {
    // justifyContent: 'center', 
    // alignItems: 'center', doesn't work
    width: '100%',
    // marginHorizontal: '10%',
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    position: 'absolute',
    bottom: 20
  },
  buttonContainer: {
    marginHorizontal: '10%',
    width: '80%'
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '88%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 20,
    marginBottom: 30,
    marginTop: 15
  },

  infoContainer: {
    width: '100%',
    paddingBottom: 10
  },

  secondaryButton: {
    backgroundColor: '#E2E9F3',
  },
  indicator: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#eee"
  },
  requirementText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '100%'
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '80%',
    letterSpacing: 0.4, //increase letter spacing 
  },
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 30,
    fontWeight: '800',
    width: '95%',
    marginHorizontal: '4'
  },

  row: {
    flexDirection: 'row',
    width: '80%',
    alignItems:'center',
    paddingBottom: 5
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    // color: '#664501',
    fontFamily: 'Manrope-Bold',
  },
  timing: {
    marginLeft: 5,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Medium',
    letterSpacing: 0.4, //increase letter spacing 
  },
});