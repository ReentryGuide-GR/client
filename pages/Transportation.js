import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Modal, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Location from 'expo-location';
// import ActionButton from '../components/ActionButton';
// import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locations from '../locationsData';
import { openGoogleMaps } from '../utils';
// import * as styles from '../../styles/detailsStyles';

const Transportation = () => {
  // const navigation = useNavigation(); // used for navigation.navigate()
  const [transportMode, setTransportMode] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

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
      setModalVisible(true);
      await AsyncStorage.setItem('modalShown', 'true');
    } else {
      openGoogleMaps(location.coordinates.lat, location.coordinates.lng, mode);
    }
  };

  return (

    <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.mainContainer}>
          <View />
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle2}>
              After you open google maps,
              {'\n'}
              if you see this button:
            </Text>
            <View style={styles.row}>
              <View style={[styles.startContainer]}>
                <Image source={require('../assets/navigation.png')} style={styles.startIcon} />
                <Text style={[styles.startText]}>Start</Text>
              </View>
            </View>
            <Text style={styles.subtitle2}>
              Click on it to start navigation.
              {'\n'}
            </Text>
            <IconButton
              iconSize={0}
              title="Continue"
              buttonStyle={styles.primaryButton}
              onPress={() => {
                setModalVisible(false);
                if (transportMode) {
                  openGoogleMaps(location.coordinates.lat, location.coordinates.lng, transportMode);
                }
              }}
            />
          </View>
          <View />
        </View>
      </Modal>

      <View style={styles.resourceContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{location.name}</Text>
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
          </Text>
          <Text style={[styles.timing, { fontFamily: 'Manrope-Bold' }]}>
            {statusTime}
          </Text>
        </View>

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

      <View style={styles.resourceContainer}>
        {/* <GoBackButton /> */}
      </View>

    </View>
  );
};

export default Transportation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  },

});
