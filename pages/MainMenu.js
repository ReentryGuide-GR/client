import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import ScrollIndicator from '../components/ScrollIndicator';
import ImportantNotice from '../components/ImportantNotice';
import ProminentDisclosure from '../components/ProminentDisclosure';

const MainMenu = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [contentHeight, setContentHeight] = useState(0);
  const scrollY = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [disclosureVisible, setDisclosureVisible] = useState(false);

  // Function to check if the user has seen the tutorial
  const checkFirstLaunch = async () => {
    try {
      const hasSeenDisclosure = await AsyncStorage.getItem('hasSeenDisclosure');
      if (hasSeenDisclosure === null) {
        setDisclosureVisible(true); // Show the disclosure modal on first launch
      } else {
        // requestLocationPermission();
      }
      const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
      if (hasSeenTutorial === null) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to check tutorial status', error);
    }
  };

  // Function to set the tutorial flag
  const setImportantNoticeSeen = async () => {
    try {
      await AsyncStorage.setItem('hasSeenTutorial', 'true');
    } catch (error) {
      console.error('Failed to set tutorial status', error);
    }
  };

  const handleLocationPermissionRequest = async () => {
    try {
      await AsyncStorage.setItem('hasSeenDisclosure', 'true'); // Set the flag
      setDisclosureVisible(false);
      requestLocationPermission();
    } catch (error) {
      console.error('Failed to set disclosure status', error);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      navigation.navigate('RequestPermission');
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    console.log(userLocation);
  };

  useEffect(() => {
    checkFirstLaunch();
    if (!disclosureVisible) {
      requestLocationPermission();
    }
  }, []);

  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <View style={styles.container}>
      <ProminentDisclosure
        modalVisible={disclosureVisible}
        setModalVisible={setDisclosureVisible}
        onAcknowledge={handleLocationPermissionRequest}
      />

      <ImportantNotice
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setImportantNoticeSeen={setImportantNoticeSeen}
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
        <View />
        <View style={styles.resourceContainer}>
          <Text style={styles.subtitle}>ReentryGuide GR</Text>
          <Text style={styles.title} allowFontScaling={false}>Main Menu</Text>
          <IconButton
            imageSource={require('../assets/food.png')}
            title=" Find Food"
            onPress={() => navigation.navigate('MealOrGroceries')}
          />
          <IconButton
            imageSource={require('../assets/clothing.png')}
            title=" Find Clothing"
            onPress={() => navigation.navigate('SelectResourceLocation', { category: 'clothing', title: 'Clothing' })}
          />
          <IconButton
            imageSource={require('../assets/sanitizer.png')}
            title=" Find Hygiene"
            onPress={() => navigation.navigate('SelectResourceLocation', { category: 'hygiene', title: 'Hygiene' })}
          />
          <IconButton
            imageSource={require('../assets/med.png')}
            title=" Find Healthcare"
            onPress={() => navigation.navigate('FindHealthcare')}
          />
        </View>
        <View />
      </Animated.ScrollView>
      <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  scrollContainer: {
    flexGrow: 1,
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
  textContainer: {
    fontSize: 15,
    alignItems: 'left',
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '90%',
  },
  primaryButton: {
    backgroundColor: '#FDDEBA',
  },
  primaryButtonText: {
    color: '#000',
  },
  secondaryButton: {
    backgroundColor: '#FDDEBA',
  },
  secondaryButtonText: {
    color: '#000',
  },
  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '90%',
  },
});
