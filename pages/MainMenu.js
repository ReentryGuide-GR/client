import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Animated, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';

const MainMenu = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [contentHeight, setContentHeight] = useState(0);
  const screenHeight = Dimensions.get('window').height;
  const scrollY = useState(new Animated.Value(0))[0];

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
      {contentHeight > screenHeight + 1 && (
        <Animated.View style={[styles.scrollIndicator, {
          height: Math.max(screenHeight * (screenHeight / contentHeight), 10),
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, Math.max(1, contentHeight - screenHeight)],
              outputRange:
              [0, Math.max(1, screenHeight
                 - Math.max(screenHeight * (screenHeight / contentHeight), 10))],
              extrapolate: 'clamp',
            }),
          }],
        }]}
        />
      )}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
  },
  scrollIndicator: {
    position: 'absolute',
    right: 2,
    width: 6,
    backgroundColor: 'black',
    borderRadius: 3,
    opacity: 0.6,
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
    backgroundColor: '#FFCBCB',
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
