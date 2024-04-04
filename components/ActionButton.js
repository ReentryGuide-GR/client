// ActionButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const ActionButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  imageSource,
  iconSize = 30,
  buttonPadding = 23, // Default padding value
}) => {
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        { padding: buttonPadding }, // Apply custom padding
      ]}
      onPress={onPress}
    >
      <View style={styles.row}>
        {imageSource && (
          <Image
            source={imageSource}
            style={[styles.icon, { width: iconSize, height: iconSize }]} // Use iconSize for both width and height
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 30,
    width: '80%',
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
    marginRight: 10,
    // width: 30,
    // height: 30,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
});

export default ActionButton;
