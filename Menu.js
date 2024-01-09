/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import ActionButton from './components/ActionButton';
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
          <TouchableOpacity style={styles.resourceButton}>
            <View style={styles.row}>
              <Image source={require('./assets/food.png')} style={styles.icon} />
              <Text style={styles.resourceButtonText}>Food</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceButton}>
            <View style={styles.row}>
              <Image source={require('./assets/clothing.png')} style={styles.icon} />
              <Text style={styles.resourceButtonText}>Clothing</Text>
            </View>
          </TouchableOpacity>
          
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
    fontSize: 20
  },
  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
  },
  resourceButton: {
    alignItems: 'left',
    borderRadius: 50,
    width: '80%',
    padding: 18,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#BFE0FF',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,
    zIndex: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    marginRight: 8,
    width: 45, // or whatever size you want
    height: 35, // or whatever size you want
  },
  resourceButtonText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
  },

});