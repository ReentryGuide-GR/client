import React from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const GoBackButton = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  return (
    <TouchableOpacity
      style={styles.GoBackButton}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.row}>
        <Image source={require('../assets/arrow_back.png')} style={styles.icon} />
        <Text style={styles.GoBackButtonText}>Go Back</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  GoBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    padding: 28,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 11,
    zIndex: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    // marginRight: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  GoBackButtonText: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.3,
    fontSize: 19,
    color: '#000',
    marginLeft: 10,
  },
});
