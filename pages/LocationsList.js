/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import IconButton from '../components/IconButton';
import GoBackButton from '../components/GoBackButton';
import locationsDetails from '../database/locations_details.json';
import { requirementsColorMapping, updateLocationStatus, getStatusStyles } from '../utils';

// Sample data array
const data = [
  { id: '1', subtitle: 'Subtitle', name: 'Name', requirementsText: 'requirementsText', distance: 0, openTime: '12:00', isOpen: 'Open' },
  { id: '2', subtitle: 'Subtitle', name: 'Name', requirementsText: 'requirementsText', distance: 0, openTime: '12:00', isOpen: 'Open' },
  // Add more objects as needed
];


const ResourceLocation = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  // const { category, subtitle } = route.params;

  // Initialize state for status and time message
  const [status, setStatus] = useState('');



  const [fontsLoaded] = useFonts({
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null to render nothing while loading fonts
  }

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <View style={[styles.indicator]}>
            <Text style={[styles.requirementText]}>{item.requirementsText}</Text>
          </View>
        </View>
        <Text style={styles.distance}>
          ~ <Text style={{ fontFamily: 'Manrope-Bold', }}>{item.distance}</Text> miles away
        </Text>
        <View style={styles.row}>
          <View style={[styles.indicator]}>
            <Text style={[styles.openOrClosed]}>{item.isOpen}</Text>
          </View>
          <Text style={styles.timing}>
            Opens at<Text style={{ fontFamily: 'Manrope-Bold', }}> {item.openTime}</Text>
          </Text>
        </View>
      </View>
      <IconButton
        title="Select"
        onPress={onClose}
        iconSize={0}
        buttonStyle={styles.secondaryButton}
      />
    </View>
    </View>
  );

return (

        <View style={styles.mainContainer}>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ width: '100%' }}
          />


          <View style={styles.resourceContainer}>
            <GoBackButton/>
          </View>

        </View>
  );
};

export default ResourceLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  listContainer: {
    alignItems: 'center',
    // backgroundColor: '#ff5555',
    width: '100%'
  },
  resourceContainer: {
    // justifyContent: 'center', 
    // alignItems: 'center', doesn't work
    width: '80%',
    marginHorizontal: '10%'
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '88%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
    marginBottom: 30,
    marginTop: 15
  },

  infoContainer: {
    width: '100%',
    paddingBottom: 10
  },

  secondaryButton: {
    backgroundColor: '#E2E9F3',
  },

  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '80%',
  },
  indicator: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#eee"
  },
  requirementText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '80%',
    letterSpacing: 0.4, //increase letter spacing 
  },
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    width: '80%',
    alignItems:'center',
    paddingBottom: 5
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    // color: '#664501',
    fontFamily: 'Manrope-Bold',
  },
  timing: {
    marginLeft: 5,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Medium',
    letterSpacing: 0.4, //increase letter spacing 
  },
});