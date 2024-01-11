/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import ActionButton from './components/ActionButton';
import ResourceButton from './components/ResourceButton';
// import * as styles from '../../styles/detailsStyles';

const Menu = ({ isVisible, onClose }) => {
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >

        <View style={styles.mainContainer}>
          <Text style={styles.title}>What do you need?</Text>
          <ResourceButton
            imageSource={require('./assets/food.png')}
            title="Food"
            onPress={() => { /* handle press */ }}
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
          
          <ActionButton
            title="Return to Map"
            onPress={onClose}
            buttonStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
        </View>

    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white', 
    padding: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    fontSize: 15, 
  },

  primaryButton: {
    backgroundColor: '#fbfbfb',
    marginBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  
  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
  },

});