/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
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
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Return to Map</Text>
          </TouchableOpacity>
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
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      borderRadius: 50,
      width: '80%',
      padding: 18,
      marginBottom: 10,
      marginTop: 10,
      shadowColor: '#A59D95',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 7, //  drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    },
  
    primaryButtonText: {
      color: '#342F2F',
      fontWeight: '900',
      fontSize: 20
    },
    title: {
      marginBottom: 18,
      color: '#2F2E41',
      fontSize: 35,
      fontWeight: '900',
  }

});