// NoLocationFound.js
import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';

const SelectResourceLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, title } = route.params;

  return (
    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top,
      easier for user to reach */}
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.title} allowFontScaling={false}>
          All
          {' '}
          {title}
          {' '}
          <Text>
            locations are currently closed
          </Text>
        </Text>

        <IconButton
          imageSource={require('../assets/locations.png')}
          iconSize={38}
          title="See All Locations"
          buttonStyle={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          onPress={() => navigation.navigate('ResourceLocationsList', { category, title })}
        />
      </View>

      <View />

    </View>
  );
};

export default SelectResourceLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: '5%',
    paddingBottom: 20,
  },
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
  textContainer: {
    fontSize: 15,
  },

  primaryButton: {
    backgroundColor: '#FDDEBA',
    padding: 25,
  },

  secondaryButtonText: {
    color: '#000',
  },

  tertiaryButton: {
    backgroundColor: '#FDDEBA',
    padding: 22,
  },

  tertiaryButtonText: {
    color: '#000',
  },

  title: {
    flexWrap: 'wrap', // Ensures text within can wrap
    flexDirection: 'row', // Aligns text in a row; default for Text, shown for clarity
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 30,
    fontWeight: '700',
    width: '95%',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
    textAlign: 'center',
  },

});
