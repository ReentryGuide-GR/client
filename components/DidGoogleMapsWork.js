// DidGoogleMapsWork.js
import React, { useState } from 'react';
import {
  Modal, View, Text, StyleSheet, Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from './IconButton';

const DidGoogleMapsWork = ({
  didGoogleMapsWorkVisible,
  setDidGoogleMapsWorkVisible,
  onReportProblem,
}) => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleYes = () => {
    setDidGoogleMapsWorkVisible(false);
    setSuccessModalVisible(true);
  };

  const handleNo = async () => {
    setDidGoogleMapsWorkVisible(false);
    await AsyncStorage.setItem('googleMapsProblemReported', 'true');
    onReportProblem();
    Linking.openURL('https://reentryguidegr.org/docs/troubleshooting');
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={didGoogleMapsWorkVisible}
        onRequestClose={() => setDidGoogleMapsWorkVisible(false)}
      >
        <View style={styles.mainContainer}>
          <View />
          <View style={styles.resourceContainer}>
            <Text style={styles.title} allowFontScaling={false}>
              Did Google Maps Work Correctly?
            </Text>
            <IconButton
              title="Yes, it worked fine."
              iconSize={0}
              onPress={handleYes}
              buttonStyle={styles.primaryButton}
            />
            <IconButton
              title="No, there was a problem."
              iconSize={0}
              onPress={handleNo}
              buttonStyle={styles.primaryButton}
            />
          </View>
          <View />
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent
        visible={successModalVisible}
        onRequestClose={handleCloseSuccessModal}
      >
        <View style={styles.mainContainer}>
          <View />
          <View style={styles.resourceContainer}>
            <Text style={styles.title} allowFontScaling={false}>You are all set!</Text>
            <IconButton
              title="Continue"
              iconSize={0}
              onPress={handleCloseSuccessModal}
              buttonStyle={styles.primaryButton}
            />
          </View>
          <View />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#FDDEBA',
  },
});

export default DidGoogleMapsWork;
