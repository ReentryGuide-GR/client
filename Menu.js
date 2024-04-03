/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import ActionButton from './components/ActionButton';
import IconButton from './components/IconButton';
import locations from './locationsData';
// import * as styles from '../../styles/detailsStyles';


const Menu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>Support Path</Text>
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

            <ActionButton
              title="More..."
              onPress={onClose}
              buttonStyle={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          </View>

          <ActionButton
            title="Call Navigator"
            onPress={onClose}
            buttonStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />

        </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    width: '100%',
    height: '100%',
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
    width: '78%',
  },
  primaryButton: {
    backgroundColor: '#A33636',
  },
  

  secondaryButton: {
    backgroundColor: '#505967',
  },
  
  secondaryButtonText: {
    color: '#fff',
  },
  
  textContainer: {
    alignItems: 'left'
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '78%',
  },

});