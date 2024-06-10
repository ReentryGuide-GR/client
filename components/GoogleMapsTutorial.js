// GoogleMapsTutorial.js
import React from 'react';
import {
  StyleSheet, View, Text, Modal, Image,
} from 'react-native';
import IconButton from './IconButton';

const GoogleMapsTutorial = ({
  googleMapsTutorialModalVisible,
  setGoogleMapsTutorialModalVisible,
  openGoogleMaps,
  location,
  transportMode,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={googleMapsTutorialModalVisible}
    onRequestClose={() => setGoogleMapsTutorialModalVisible(false)}
  >
    <View style={styles.mainContainer}>
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.title} allowFontScaling={false}>
          Google Maps Tutorial
        </Text>
        <Text style={styles.subtitle2}>
          Just in case,
          {'\n'}
          if you see this button:
        </Text>
        <View style={styles.row}>
          <Text style={styles.quote}>&quot;</Text>
          <View style={[styles.startContainer]}>
            <Image source={require('../assets/navigation.png')} style={styles.startIcon} />
            <Text style={[styles.startText]}>Start</Text>
          </View>
          <Text style={styles.quote}>&quot;</Text>
        </View>
        <Text style={styles.subtitle2}>
          Click on it to start navigation.
          {'\n'}
        </Text>
        <Text style={styles.subtitle2}>
          If you feel confused, ask people for help!
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="Continue"
          buttonStyle={styles.primaryButton}
          onPress={() => {
            setGoogleMapsTutorialModalVisible(false);
            if (transportMode) {
              openGoogleMaps(
                location.coordinates.lat,
                location.coordinates.lng,
                transportMode,
              );
            }
          }}
        />
      </View>
      <View />
    </View>
  </Modal>
);

export default GoogleMapsTutorial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
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
  subtitle2: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  quote: {
    marginBottom: 10,
    marginHorizontal: 7,
    fontSize: 25,
    color: '#2F2E41',
    fontFamily: 'Manrope-Bold',
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
});
