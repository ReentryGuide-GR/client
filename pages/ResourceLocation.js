/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import GoBackButton from '../components/GoBackButton';
import locationsDetails from '../database/locations_details.json';
import { requirementsColorMapping, updateLocationStatus, getStatusStyles } from '../utils';

// import * as styles from '../../styles/detailsStyles';


const ResourceLocation = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { location, distance, category } = route.params;

  // Initialize state for status and time message
  const [status, setStatus] = useState('');
  const { statusBackgroundColor, statusTextStyleColor, statusText } = getStatusStyles(status);

  const [timeMessage, setTimeMessage] = useState('');

  // Declare requirementsText  
  const [requirementsText, setRequirementsText] = useState('');
  const [requirementIndicatorStyle, setRequirementIndicatorStyle] = useState({});
  const [requirementsTextStyle, setRequirementsTextStyle] = useState({});

  // The indicator showing a place is whether opening or closed is determined here: 
  useEffect(() => {
    const statusUpdate = updateLocationStatus(location.openHours);
    setStatus(statusUpdate.status);
    setTimeMessage(statusUpdate.message);
  }, [location]);

  // Find the matching entry and extract the requirementsText:
  useEffect(() => {
    const matchingDetails = locationsDetails[category]?.find(detail => detail.id === location.id);
    if (matchingDetails) {
        setRequirementsText(matchingDetails.requirementsText);
        // New: Use requirementsColorMapping to set colors
        const { backgroundColor, textColor } = requirementsColorMapping(matchingDetails.requirementsColor);
        setRequirementIndicatorStyle({ backgroundColor });
        setRequirementsTextStyle({ color: textColor });
    }
  }, [location, category]); // Dependency on category to re-run effect if it changes


  const [fontsLoaded] = useFonts({
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }


return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>Closest food location:</Text>
            <Text style={styles.title}>{location.name}</Text>
            <View style={styles.row}>
              <View style={[styles.indicator, requirementIndicatorStyle]}>
              <Text style={[styles.requirementText, requirementsTextStyle]}>{requirementsText}</Text>
              </View>
            </View>
            <Text style={styles.distance}>
              ~ <Text style={{ fontFamily: 'Manrope-Bold', }}>{distance}</Text> miles away
            </Text>

            {/* <Text style={styles.coordinates}>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</Text> */}
            <View style={styles.row}>
              <View style={[styles.indicator, statusBackgroundColor]}>
                <Text style={[styles.openOrClosed, { color: statusTextStyleColor }]}>{statusText}</Text>
              </View>
              <Text style={styles.timing}> - {timeMessage}</Text>
            </View>
          </View>

          <View style={styles.resourceContainer}>

            <IconButton
              imageSource={require('../assets/directions.png')}
              title="Plan Your Route  "
              iconSize={32}
              buttonStyle={styles.secondaryButton}
              onPress={() => 
                navigation.navigate('Transportation', { 
                  location: location,
                  distance: distance,
                  requirementIndicatorStyle: requirementIndicatorStyle.backgroundColor,
                  requirementsTextStyle: requirementsTextStyle.color,
                  requirementsText: requirementsText,
                  statusText: statusText, // Added status text here
                  indicatorColor: statusBackgroundColor.backgroundColor, // Extract backgroundColor from the style object
                  textColor: statusTextStyleColor, // Extract color from the style object
                  timeMessage: timeMessage 
                })                
              }
            />

            <IconButton
              title="More Info  "
              iconSize={32}
              onPress={onClose}
              imageSource={require('../assets/info.png')}
              buttonStyle={styles.tertiaryButton}
            />
          </View>

          <View style={styles.resourceContainer}>

          <GoBackButton/>

          </View>

        </View>
  );
};

export default ResourceLocation;

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

  secondaryButton: {
    backgroundColor: '#E2E9F3',
    padding: 25
  },

  tertiaryButton: {
    // backgroundColor: '#E2E9F3',
    padding: 25
  },

  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '80%',
  },
  indicator: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  requirementText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '80%',
  },
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '80%',
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
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Bold',
  },
});