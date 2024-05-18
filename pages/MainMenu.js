import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Modal, Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import ScrollIndicator from '../components/ScrollIndicator';

const MainMenu = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [contentHeight, setContentHeight] = useState(0);
  const scrollY = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);

  // Function to check if the user has seen the tutorial
  const checkFirstLaunch = async () => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
      if (hasSeenTutorial === null) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to check tutorial status', error);
    }
  };

  // Function to set the tutorial flag
  const setTutorialSeen = async () => {
    try {
      await AsyncStorage.setItem('hasSeenTutorial', 'true');
    } catch (error) {
      console.error('Failed to set tutorial status', error);
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
    requestLocationPermission();
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
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View />
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
              onPress={() => {
                setModalVisible(false);
                setTutorialSeen(); // Set the tutorial as seen
              }}
            />
          </View>
          <View />
        </View>
      </Modal>
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
    backgroundColor: '#eae0d4',
  },
  primaryButtonText: {
    color: '#000',
  },
  secondaryButton: {
    backgroundColor: '#eae0d4',
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
