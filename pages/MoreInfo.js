/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GoBackButton from '../components/GoBackButton';
import locationsDetails from '../database/locations_details.json';
// import { openGoogleMaps } from '../utils'
// import * as styles from '../../styles/detailsStyles';


const MoreInfo = ({ onClose }) => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { location, distance, indicatorColor, textColor, timeMessage, statusText, statusTime, requirementIndicatorStyle, requirementsTextStyle, requirementsText, subtitle, category } = route.params;

  // Find the matching location details
  const locationDetails = locationsDetails[category].find(detail => detail.id === location.id);

//   const handlePlanYourRoute = (mode) => {
//     openGoogleMaps(location.coordinates.lat, location.coordinates.lng, mode);
//   };

return (

        <View style={styles.mainContainer}>
          <View style={styles.resourceContainer}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.title}>{location.name}</Text>
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: requirementIndicatorStyle }]}>
                <Text style={[styles.openOrClosed, { color: requirementsTextStyle }]}>{requirementsText}</Text> 
              </View>
            </View>
            <Text style={styles.distance}>
              ~ <Text style={{ fontFamily: 'Manrope-Bold', }}>{distance}</Text> miles away
            </Text>
            {/* <Text style={styles.coordinates}>Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}</Text> */}
            <View style={styles.row}>
              <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
                <Text style={[styles.openOrClosed, { color: textColor }]}>{statusText}</Text> 
              </View>
              <Text style={styles.timing}> 
                 {timeMessage}<Text style={{ fontFamily: 'Manrope-Bold', }}>{statusTime}</Text>
              </Text>
            </View>



          </View>

          <View style={styles.resourceContainer}>
            <View style={styles.card}>
                <View style={styles.row2}>
                    <Text style={styles.text}>Open Hours</Text>
                    <Text style={styles.text2}>Monday - Thursday 12:00 - 2:00</Text>

                </View>
                <View style={[styles.row2, {backgroundColor: '#eee'}]}>
                    <Text style={styles.text}>Address</Text>
                    <Text style={styles.text2}>{locationDetails.address}</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={styles.text}>Phone</Text>
                    <Text style={styles.text2}>{locationDetails.phone}</Text>
                </View>
            </View>
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

export default MoreInfo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  resourceContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    width: '80%',
  },
  textContainer: {
    fontSize: 15, 
  },
  subtitle: {
    marginBottom: -2,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '100%',
  },
  subtitle2: {
    marginBottom: 10,
    fontSize: 17,
    color: '#2F2E41',
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#E2E9F3',
  },

  title: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems:'center',
    paddingBottom: 5
  },
  indicator: {
    backgroundColor: '#fce9c0',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  openOrClosed: {
    fontSize: 17,
    // fontWeight: '700',
    color: '#664501',
    fontFamily: 'Manrope-Bold',
  },
  timing: {
    marginLeft: 5,
    fontSize: 17,
    // fontWeight: '700',
    fontFamily: 'Manrope-Medium',
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '105%',
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30
  },
  text: {
    // marginBottom: -2,
    // color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-SemiBold',
    width: '40%',
    paddingVertical: 5,
  },
  text2: {
    // marginBottom: -2,
    // color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    width: '65%',
    paddingVertical: 5,
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    // alignItems:'center',
    justifyContent: 'flex-start',
    paddingBottom: 5, 
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});