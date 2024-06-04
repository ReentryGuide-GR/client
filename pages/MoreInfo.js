import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Animated,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import locationsBasic from '../database/locations_basic.json';
import locationsDetails from '../database/locations_details.json';
import { formatOpenHours } from '../utils';
import ScrollIndicator from '../components/ScrollIndicator';
import IconButton from '../components/IconButton';

const MoreInfo = () => {
  // const navigation = useNavigation(); // used for navigation.navigate()
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
    category,
  } = route.params;

  // Find the matching location details
  const locationDetails = locationsDetails[category].find((detail) => detail.id === location.id);
  const [openHoursFormatted, setOpenHoursFormatted] = useState('');

  // Scroll Bar related code
  const scrollY = useState(new Animated.Value(0))[0];
  const [contentHeight, setContentHeight] = useState(0);

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity value is 0

  useEffect(() => {
    const details = locationsBasic[category].find((detail) => detail.id === location.id);
    if (details) {
      if (!details.openHours || details.openHours.length === 0) {
        setOpenHoursFormatted('Hours by appointment');
      } else {
        setOpenHoursFormatted(formatOpenHours(details.openHours));
      }
    }
  }, [location, category]);

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
        {showCopiedMessage && (
          <Animated.View style={[styles.isCopiedMessageContainer, { opacity: fadeAnim }]}>
            <View style={styles.isCopiedMessage}>
              <Text style={styles.isCopiedText}>Successfully Copied Address</Text>
            </View>
          </Animated.View>
        )}
        <View style={styles.resourceContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title} allowFontScaling={false}>{location.name}</Text>
          <View style={styles.row}>
            <Text style={[
              styles.requirementsText,
              {
                color: requirementsTextStyle,
                backgroundColor: requirementIndicatorStyle,
              }]}
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
          <View style={styles.card}>

            <View style={styles.row2}>
              <Text style={styles.text}>Open Hours</Text>
              <Text style={styles.text2}>{openHoursFormatted}</Text>
            </View>

            <View style={[styles.row2, { backgroundColor: '#eee' }]}>
              <Text style={styles.text}>Address</Text>
              <Text style={styles.text2}>{locationDetails.address}</Text>
            </View>

            <View style={styles.row2}>
              <Text style={styles.text}>Phone</Text>
              <Text style={styles.text2}>{locationDetails.phone}</Text>
            </View>

          </View>
        </View>

        <View style={styles.resourceContainer}>
          <IconButton
            imageSource={require('../assets/content_copy.png')}
            title="Copy Address"
            buttonStyle={styles.primaryButton}
            onPress={() => {
              Clipboard.setString(locationDetails.address);
              setShowCopiedMessage(true);
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }).start(() => {
                setTimeout(() => {
                  Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                  }).start(() => {
                    setShowCopiedMessage(false);
                  });
                }, 1500);
              });
            }}
            iconSize={35}
          />
        </View>

      </Animated.ScrollView>

      <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />

    </View>
  );
};

export default MoreInfo;

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
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  isCopiedMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  isCopiedMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  isCopiedText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Manrope-Bold',
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
    backgroundColor: '#FDDEBA',
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
  requirementsText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    // backgroundColor: '#eee',
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
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
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '105%',
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
  },
  text: {
    // marginBottom: -2,
    // color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-SemiBold',
    width: '40%',
    paddingVertical: 5,
  },
  text2: {
    // marginBottom: -2,
    // color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '65%',
    paddingVertical: 5,
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    // alignItems:'center',
    justifyContent: 'flex-start',
    paddingBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
