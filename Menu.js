/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import ActionButton from './components/ActionButton';
import ResourceButton from './components/ResourceButton';
import * as Location from 'expo-location';
// import * as styles from '../../styles/detailsStyles';

const openGoogleMaps = (lat, lng) => {
  // Use the geo URI scheme for Android
  const url = Platform.OS === 'android' 
    ? `google.navigation:q=${lat},${lng}&mode=w` // 'w' stands for walking
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;

  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const Menu = ({ isVisible, onClose }) => {
return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.title}>What do you need?</Text>
            <ResourceButton
              imageSource={require('./assets/food.png')}
              title="Food"
              onPress={() => openGoogleMaps(42.9634, -85.6681)}
            />
            <ResourceButton
              imageSource={require('./assets/clothing.png')}
              title="Clothing"
              onPress={onClose}
            />
            <ResourceButton
              imageSource={require('./assets/drop.png')}
              title="Hygiene"
              onPress={onClose}
            />
            <ResourceButton
              imageSource={require('./assets/med.png')}
              title="Healthcare"
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
  primaryButton: {
    backgroundColor: '#A33636',
  },

  secondaryButton: {
    backgroundColor: '#505967',
  },
  
  secondaryButtonText: {
    color: '#fff',
  },


  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
  },

});