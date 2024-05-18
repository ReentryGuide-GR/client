import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const ScrollIndicator = ({ contentHeight, scrollY }) => {
  const screenHeight = Dimensions.get('window').height;

  if (contentHeight <= screenHeight + 1) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.scrollIndicator,
        {
          height: Math.max(screenHeight * (screenHeight / contentHeight), 10),
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [0, Math.max(1, contentHeight - screenHeight)],
              outputRange: [0, Math.max(1, screenHeight
                - Math.max(screenHeight * (screenHeight / contentHeight), 10))],
              extrapolate: 'clamp',
            }),
          }],
        },
      ]}
    />
  );
};

export default ScrollIndicator;

const styles = StyleSheet.create({
  scrollIndicator: {
    position: 'absolute',
    right: 2,
    width: 6,
    backgroundColor: 'black',
    borderRadius: 3,
    opacity: 0.6,
  },
});
