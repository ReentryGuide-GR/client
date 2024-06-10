import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Linking, Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import locationsDetails from '../database/locations_details.json';
import { requirementsColorMapping, updateLocationStatus, getStatusStyles } from '../utils';
import ScrollIndicator from '../components/ScrollIndicator';

const ResourceLocation = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const {
    location, distance, category, subtitle,
  } = route.params;

  // Initialize state for status and time message
  const [status, setStatus] = useState('');

  // Scroll Bar related code
  const scrollY = useState(new Animated.Value(0))[0];
  const [contentHeight, setContentHeight] = useState(0);

  const { statusBackgroundColor, statusTextStyleColor, statusText } = getStatusStyles(status);

  const [timeMessage, setTimeMessage] = useState('');
  const [statusTime, setStatusTime] = useState('');

  // Declare requirementsText
  const [requirementsText, setRequirementsText] = useState('');
  const [requirementIndicatorStyle, setRequirementIndicatorStyle] = useState({});
  const [requirementsTextStyle, setRequirementsTextStyle] = useState({});

  const [phoneNumber, setPhoneNumber] = useState('');

  // The indicator showing a place is whether opening or closed is determined here:
  useEffect(() => {
    const statusUpdate = updateLocationStatus(location.openHours);
    setStatus(statusUpdate.status);
    setTimeMessage(statusUpdate.message);
    setStatusTime(statusUpdate.time);
  }, [location]);

  // Find the matching entry and extract the data:
  useEffect(() => {
    const matchingDetails = locationsDetails[category]?.find((detail) => detail.id === location.id);
    if (matchingDetails) {
      setRequirementsText(matchingDetails.requirementsText);
      // Extract and set the phone number from matching details
      setPhoneNumber(matchingDetails.phone);
      const {
        backgroundColor,
        textColor,
      } = requirementsColorMapping(matchingDetails.requirementsColor);
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
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onContentSizeChange={(width, height) => setContentHeight(height)}
      >

        <View style={styles.resourceContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title} allowFontScaling={false}>{location.name}</Text>
          <View style={styles.row}>
            <Text style={[
              styles.requirementsText,
              requirementsTextStyle,
              { backgroundColor: requirementIndicatorStyle.backgroundColor },
            ]}
            >
              {requirementsText}
            </Text>
          </View>
          <Text style={styles.distance}>
            ~&nbsp;
            <Text style={{ fontFamily: 'Manrope-Bold' }}>
              {distance}
            </Text>
            &nbsp;miles away
          </Text>
          {/* For Debug */}
          {/* <Text style={styles.coordinates}>Lat: {location.coordinates.lat},
          Lng: {location.coordinates.lng}</Text> */}
          <View style={styles.row}>
            <View style={[styles.indicator, statusBackgroundColor]}>
              <Text style={[styles.openOrClosed, { color: statusTextStyleColor }]}>
                {statusText}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.timing}>
              {timeMessage}
              &nbsp;
              <Text style={{ fontFamily: 'Manrope-Bold' }}>{statusTime}</Text>
            </Text>
          </View>

        </View>

        <View style={styles.resourceContainer}>

          <IconButton
            imageSource={require('../assets/directions.png')}
            title="Plan Your Route"
            iconSize={32}
            buttonStyle={styles.secondaryButton}
            onPress={() => navigation.navigate('SelectTransportation', {
              location,
              distance,
              requirementIndicatorStyle: requirementIndicatorStyle.backgroundColor,
              requirementsTextStyle: requirementsTextStyle.color,
              requirementsText,
              statusText, // Added status text here
              // Extract backgroundColor from the style object
              indicatorColor: statusBackgroundColor.backgroundColor,
              textColor: statusTextStyleColor, // Extract color from the style object
              timeMessage,
              statusTime,
              subtitle,
            })}
          />

          <IconButton
            imageSource={require('../assets/call.png')}
            title="Call Them"
            iconSize={32}
            buttonStyle={styles.secondaryButton}
            onPress={() => {
              // Use the Linking API to open the phone app, empty number for now
              Linking.openURL(`tel:${phoneNumber}`)
                .catch((err) => {
                  console.error('Failed to open the phone app', err);
                });
            }}
          />

          <IconButton
            title="More Info"
            iconSize={32}
            imageSource={require('../assets/info.png')}
            buttonStyle={styles.tertiaryButton}
            onPress={() => navigation.navigate('MoreInfo', {
              location,
              distance,
              requirementIndicatorStyle: requirementIndicatorStyle.backgroundColor,
              requirementsTextStyle: requirementsTextStyle.color,
              requirementsText,
              statusText, // Added status text here
              // Extract backgroundColor from the style object
              indicatorColor: statusBackgroundColor.backgroundColor,
              textColor: statusTextStyleColor, // Extract color from the style object
              timeMessage,
              statusTime,
              subtitle,
              category,
            })}
          />
        </View>

        <View />
      </Animated.ScrollView>
      <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />
    </View>
  );
};

export default ResourceLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
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
  },

  secondaryButton: {
    backgroundColor: '#FDDEBA',
    padding: 25,
  },

  tertiaryButton: {
    // backgroundColor: '#FDDEBA',
    padding: 25,
  },

  subtitle: {
    marginBottom: -2,
    marginLeft: 4,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '100%',
  },
  indicator: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  requirementsText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    // backgroundColor: '#eee',
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '100%',
    letterSpacing: 0.4, // increase letter spacing
  },
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5,
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
    letterSpacing: 0.4, // increase letter spacing
  },
});
