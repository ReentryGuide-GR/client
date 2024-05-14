import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 8000); // Delay subtitle appearance for 10 seconds

    return () => clearTimeout(timer); // Ensure to clear the timer to prevent memory leaks
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
      {showSubtitle && (
        <Text style={styles.subtitle}>
          If loading takes too long,
          make sure you have internet connection, then restart this app.
        </Text>
      )}
    </View>
  );
};

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
