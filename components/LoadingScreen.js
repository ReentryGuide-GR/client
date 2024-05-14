import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Loading...</Text>
    <Text style={styles.subtitle}>
      if loading takes too long,
      make sure you have internet connection, then restart this app.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
});

export default LoadingScreen;
