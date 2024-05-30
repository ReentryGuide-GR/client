import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Animated, AppState,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from '../components/IconButton';
import { openGoogleMaps } from '../utils';
import GoogleMapsTutorial from '../components/GoogleMapsTutorial';
import ScrollIndicator from '../components/ScrollIndicator';
import DidGoogleMapsWork from '../components/DidGoogleMapsWork';

const SelectTransportation = () => {
  const [transportMode, setTransportMode] = useState(null);
  const [googleMapsTutorialModalVisible, setGoogleMapsTutorialModalVisible] = useState(false);
  // For debugging purposes
  // const [googleMapsTutorialModalVisible, setGoogleMapsTutorialModalVisible] = useState(true);
  // Scroll Bar related code
  const scrollY = useState(new Animated.Value(0))[0];
  const [contentHeight, setContentHeight] = useState(0);

  const [didGoogleMapsWorkVisible, setDidGoogleMapsWorkVisible] = useState(false);

  const route = useRoute();
  const {
    location,
    distance,
    indicatorColor,
    textColor,
    timeMessage,
    statusText,
    statusTime,
    requirementIndicatorStyle,
    requirementsTextStyle,
    requirementsText,
    subtitle,
  } = route.params;

  const handlePlanYourRoute = async (mode) => {
    setTransportMode(mode); // Store the mode for later use
    const hasBeenShown = await AsyncStorage.getItem('modalShown');
    if (hasBeenShown !== 'true') {
      setGoogleMapsTutorialModalVisible(true);
      await AsyncStorage.setItem('modalShown', 'true');
    } else {
      await AsyncStorage.setItem('googleMapsLaunched', 'true');
      openGoogleMaps(location.coordinates.lat, location.coordinates.lng, mode);
    }
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        const googleMapsLaunched = await AsyncStorage.getItem('googleMapsLaunched');
        if (googleMapsLaunched === 'true') {
          const crashPromptShown = await AsyncStorage.getItem('crashPromptShown');
          if (crashPromptShown !== 'true') {
            setDidGoogleMapsWorkVisible(true);
            await AsyncStorage.setItem('crashPromptShown', 'true');
          }
          await AsyncStorage.removeItem('googleMapsLaunched');
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <GoogleMapsTutorial
        googleMapsTutorialModalVisible={googleMapsTutorialModalVisible}
        setGoogleMapsTutorialModalVisible={setGoogleMapsTutorialModalVisible}
        openGoogleMaps={openGoogleMaps}
        location={location}
        transportMode={transportMode}
      />
      <DidGoogleMapsWork
        didGoogleMapsWorkVisible={didGoogleMapsWorkVisible}
        setDidGoogleMapsWorkVisible={setDidGoogleMapsWorkVisible}
      />

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
            <View style={[styles.indicator, { backgroundColor: requirementIndicatorStyle }]}>
              <Text style={[styles.openOrClosed, { color: requirementsTextStyle }]}>
                {requirementsText}
              </Text>
            </View>
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
            <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
              <Text style={[styles.openOrClosed, { color: textColor }]}>{statusText}</Text>
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
            title="If Google Maps Crashes"
            buttonStyle={styles.secondaryButton}
            onPress={() => handlePlanYourRoute('walking')}
            iconSize={0}
          />
        </View>

        <View style={styles.resourceContainer}>
          <Text style={styles.subtitle2}>How will you get there?</Text>

          <IconButton
            imageSource={require('../assets/walk.png')}
            title="By Walking"
            buttonStyle={styles.primaryButton}
            onPress={() => handlePlanYourRoute('walking')}
          />

          <IconButton
            imageSource={require('../assets/subway.png')}
            title="By Bus"
            buttonStyle={styles.primaryButton}
            onPress={() => handlePlanYourRoute('transit')}
          />

          <IconButton
            imageSource={require('../assets/car.png')}
            title="By Driving"
            buttonStyle={styles.primaryButton}
            onPress={() => handlePlanYourRoute('driving')} // 'd' for driving
          />
        </View>

        <View />

      </Animated.ScrollView>
      <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />
    </View>

  );
};

export default SelectTransportation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  startContainer: {
    backgroundColor: '#1970E2',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontSize: 15,
    // fontWeight: '700',
    color: '#fff',
    fontFamily: 'Manrope-SemiBold',
  },
  startIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: -3,
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
    marginLeft: 4,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '100%',
  },
  subtitle2: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#eae0d4',
  },
  secondaryButton: {
    backgroundColor: '#fff',
  },

  title: {
    marginBottom: 8,
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
  indicator: {
    backgroundColor: '#fce9c0',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    color: '#664501',
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
