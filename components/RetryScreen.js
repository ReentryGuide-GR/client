import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton'; // Adjust path as necessary

const OfflineScreen = ({ retryFunction, message }) => {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.resourceContainer}>
        <Text style={styles.warning}>
          {message || 'Failed to connect. Please check your internet connection and try again.'}
        </Text>
        <IconButton
          iconSize={0} // Set a reasonable default size or make this customizable via props
          title="Try Again"
          buttonStyle={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          onPress={retryFunction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  warning: {
    flexWrap: 'wrap', // Ensures text within can wrap
    flexDirection: 'row', // Aligns text in a row; default for Text, shown for clarity
    marginBottom: 30,
    color: '#2F2E41',
    fontSize: 20,
    fontWeight: '600',
    width: '95%',
  },
  primaryButton: {
    backgroundColor: '#eae0d4',
    padding: 25,
  },
});

export default OfflineScreen;
