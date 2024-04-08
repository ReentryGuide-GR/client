/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import ActionButton from './components/ActionButton';
import IconButton from './components/IconButton';
import locations from './locationsData';
// import * as styles from '../../styles/detailsStyles';


const Menu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const [fontsLoaded] = useFonts({
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

return (

        <View style={styles.mainContainer}>
          <IconButton
            title="Call Navigator"
            onPress={onClose}
            buttonStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            // arrowStyle="white"
          />
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>GR HelpHub</Text>
            <Text style={styles.title}>Main Menu</Text>
            <IconButton
              imageSource={require('./assets/food.png')}
              title=" Find Food"
              onPress={() => navigation.navigate('MealOrGroceries')}
            />
            <IconButton
              imageSource={require('./assets/clothing.png')}
              title=" Find Clothing"
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Clothing' })}
            />
            <IconButton
              imageSource={require('./assets/drop.png')}
              title=" Find Hygiene"
              onPress={onClose}
            />
            <IconButton
              imageSource={require('./assets/med.png')}
              title=" Find Healthcare"
              onPress={onClose}
            />

          </View>
          {/* Placeholder for space at the bottom */}
          <View></View> 

        </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
    width: '100%',
  },
  resourceContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    fontSize: 15, 
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '80%',
    marginLeft: 20
  },
  primaryButton: {
    backgroundColor: '#FFCBCB',
  },
  primaryButtonText: {
    color: '#000',
  },

  secondaryButton: {
    backgroundColor: '#E2E9F3',
  },
  
  secondaryButtonText: {
    color: '#000',
  },
  
  textContainer: {
    alignItems: 'left'
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '80%',
    marginLeft: 20
  },

});