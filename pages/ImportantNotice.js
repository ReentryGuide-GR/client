import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton'; // Adjust the import path as needed

const ImportantNoticeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  const setImportantNoticeSeen = async () => {
    try {
      await AsyncStorage.setItem('hasSeenImportantNotice', 'true');
      navigation.navigate('MainMenu');
    } catch (error) {
      console.error('Failed to set tutorial status', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resourceContainer}>
        <Text style={styles.modalTitle} allowFontScaling={false}>
          Important Notice
        </Text>
        <Text style={styles.modalText}>
          {'\n'}
          Please do not rely solely on this app for navigation.
          {'\n'}
          Check your route and stay alert.
          {'\n'}
          If you feel lost or unsure, ask for help.
          {'\n'}
        </Text>
        <IconButton
          iconSize={0}
          title="I Understand"
          buttonStyle={styles.primaryButton}
          onPress={setImportantNoticeSeen}
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

export default ImportantNoticeScreen;
