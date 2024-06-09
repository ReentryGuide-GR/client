import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from '../components/IconButton'; // Adjust the import path as needed

const ProminentDisclosure = ({ navigation }) => {
  const handleAcknowledge = async () => {
    try {
      await AsyncStorage.setItem('hasSeenDisclosure', 'true'); // Set the flag
      navigation.navigate('MainMenu');
    } catch (error) {
      console.error('Failed to set disclosure status', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resourceContainer}>
        <Text style={styles.modalTitle} allowFontScaling={false}>
          Location Permission
        </Text>
        <Text style={styles.modalText}>
          {'\n'}
          In order to calculate the distance, Please allow location access.
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="OK"
          buttonStyle={styles.primaryButton}
          onPress={handleAcknowledge}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  modalText: {
    marginBottom: 10,
    marginLeft: 7,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  modalTitle: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  primaryButton: {
    backgroundColor: '#FDDEBA',
  },
});

export default ProminentDisclosure;
