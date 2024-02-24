// ActionButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const ActionButton = ({ onPress, title, buttonStyle, textStyle, imageSource }) => {
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {/* <Text style={[styles.buttonText, textStyle]}>{title}</Text> */}
      <View style={styles.row}>
        {/* conditionally render the <Image> component */}
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 30,
    width: '78%',
    padding: 23,
    marginTop: 7,
    marginBottom: 7,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,
    zIndex: 11,
  },
  buttonText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.3,
    fontSize: 19,
    color: '#fff',
  },
  icon: {
    marginRight: 5,
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
});

export default ActionButton;
