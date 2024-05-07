// in IconButton.js
import React from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';

const IconButton = ({
  onPress,
  imageSource,
  title,
  buttonStyle,
  textStyle,
  arrowStyle,
  iconSize = 40,
}) => {
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  // Determine the arrow image based on arrowStyle
  const arrowImageSource = arrowStyle === 'white'
    ? require('../assets/arrow_forward_white.png')
    : require('../assets/arrow_forward.png');

  return (
    <TouchableOpacity style={[styles.IconButton, buttonStyle]} onPress={onPress}>
      <View style={styles.row}>
        <Image
          source={imageSource}
          style={[styles.icon, { width: iconSize, height: iconSize }]} // Use iconSize here
        />
        <Text style={[styles.IconButtonText, textStyle]}>{title}</Text>
      </View>
      <Image source={arrowImageSource} style={[styles.arrow]} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  IconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    padding: 21,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
    zIndex: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 0,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  arrow: {
    marginRight: 0,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  IconButtonText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.3,
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
});
