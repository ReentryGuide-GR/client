/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';
// import ActionButton from '../components/ActionButton';
import GoBackButton from '../components/GoBackButton';
import IconButton from '../components/IconButton';
// import locationsData from './database/locations_basic.json';
// import * as styles from '../../styles/detailsStyles';


const Page = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
return (

        <View style={styles.mainContainer}>
          {/* Empty Component to make buttons in the middle of the screen but not on top, easier for user to reach*/}
          <View></View> 
          <View style={styles.resourceContainer}>
            <Text style={styles.title}>Find Healthcare</Text>
            <IconButton
              imageSource={require('../assets/pill.png')}
              title=" Find Medical Help"
              buttonStyle={styles.primaryButton}
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Medical', title: 'Medical Help' })}
            />

            <IconButton
              imageSource={require('../assets/tooth.png')}
              title=" Find Tooth Care"
              buttonStyle={styles.primaryButton}
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Dental', title: 'Tooth Care' })}
            />
            <IconButton
              imageSource={require('../assets/eye.png')}
              title=" Find Eye Doctor"
              buttonStyle={styles.primaryButton}
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Vision', title: 'Eye Doctor' })}
            />
            <IconButton
              imageSource={require('../assets/hand_heart.png')}
              title=" Find Mental Support"
              buttonStyle={styles.primaryButton}
              onPress={() => navigation.navigate('SelectResourceLocation', { category: 'Mental', title: 'Mental Support' })}
            />

          </View>

          <View style={styles.resourceContainer}>

            <GoBackButton/>

            {/* <ActionButton
              title="Call Navigator"
              onPress={onClose}
              buttonStyle={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            /> */}

          </View>

        </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: 20,
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
    backgroundColor: '#E2E9F3',
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },

});