import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, FlatList, Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import RetryScreen from '../components/RetryScreen';
import LoadingScreen from '../components/LoadingScreen';
import IconButton from '../components/IconButton';
import ScrollIndicator from '../components/ScrollIndicator';
import locationsBasic from '../database/locations_basic.json';
import locationsDetails from '../database/locations_details.json';
import {
  getDistance,
  getUserLocation,
  requirementsColorMapping,
  updateLocationStatus,
  getStatusStyles,
} from '../utils';

const ResourceLocationsList = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  const route = useRoute();
  const { category, title } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading screen state
  const [isOffline, setIsOffline] = useState(false);

  const [fontsLoaded] = useFonts({
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  });

  // Scroll Bar related code
  const scrollY = useState(new Animated.Value(0))[0];
  const [contentHeight, setContentHeight] = useState(0);

  const fetchAndMergeData = async () => {
    setIsLoading(true); // Start loading
    setIsOffline(false); // Reset offline status on new fetch attempt
    try {
      const userLocation = await getUserLocation();
      const categoryData = locationsBasic[category];
      if (categoryData) {
        const mergedData = categoryData.map((location) => {
          const details = locationsDetails[category].find(
            (detail) => detail.id === location.id,
          ) || {};
          const distance = userLocation ? getDistance(
            userLocation.latitude,
            userLocation.longitude,
            location.coordinates.lat,
            location.coordinates.lng,
          ) : 'N/A';
          const colorMapping = requirementsColorMapping(details.requirementsColor);
          const statusDetails = updateLocationStatus(location.openHours);
          const statusStyles = getStatusStyles(statusDetails.status); // This line is updated

          return {
            ...location,
            ...details,
            ...colorMapping,
            distance: typeof distance === 'number' ? (distance * 0.621371).toFixed(1) : distance,
            ...statusDetails,
            ...statusStyles, // Spread the styles directly into the object
          };
        }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        setData(mergedData);
      } else {
        console.warn(`No data found for category: ${category}`);
        setData([]);
      }
    } catch (error) {
      setIsOffline(true); // Set offline status if an error occurs
      // console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndMergeData();
  }, [category]);

  if (!fontsLoaded || isLoading) {
    return (<LoadingScreen />);
  }

  if (isOffline) {
    return (
      <RetryScreen
        retryFunction={fetchAndMergeData}
      />
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.title} allowFontScaling={false}>{item.name}</Text>
          <View style={styles.row}>
            <Text style={[
              styles.requirementText,
              {
                color: item.textColor,
                backgroundColor: item.backgroundColor,
              }]}
            >
              {item.requirementsText}
            </Text>
          </View>
          <Text style={styles.distance}>
            ~&nbsp;
            <Text style={{ fontFamily: 'Manrope-Bold' }}>
              {item.distance}
            </Text>
            &nbsp;miles away
          </Text>
          <View style={styles.row}>
            <View style={[styles.indicator, item.statusBackgroundColor]}>
              <Text style={[styles.openOrClosed, { color: item.statusTextStyleColor }]}>
                {item.statusText}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.timing}>
              {item.message}
              &nbsp;
              <Text style={{ fontFamily: 'Manrope-Bold' }}>{item.time}</Text>
            </Text>
          </View>
        </View>
        <IconButton
          title="Select"
          onPress={() => navigation.navigate('ResourceLocation', {
            location: item, // Pass the whole item as 'location'
            category,
            distance: item.distance,
          })}
          iconSize={0}
          buttonStyle={styles.secondaryButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle} allowFontScaling={false}>
          Select
          {' '}
          {title}
          &nbsp;Location
        </Text>
        <Text style={styles.pageSubtitle}>
          Scroll down to see more options
        </Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
            minHeight: '100%',
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          onContentSizeChange={(width, height) => setContentHeight(height)}
        />

        <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />

      </View>
    </View>
  );
};

export default ResourceLocationsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align children to the top
    // alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%',
    // paddingBottom: '5%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '900',
    width: '100%',
    textAlign: 'center',
  },
  pageTitleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    paddingBottom: 15,
    top: 0,
    // elevation: 7,
    // position: 'absolute',
    zIndex: 100,
    width: '100%',
  },
  pageTitle: {
    // color: '#2F2E41',
    fontSize: 30,
    fontWeight: '900',
    // width: '95%',
    marginHorizontal: '10%',
    // position: 'absolute',
  },
  pageSubtitle: {
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    marginHorizontal: '10%',
  },
  listContainer: {
    alignItems: 'center',
    // backgroundColor: '#ff5555',
    width: '100%',
  },
  resourceContainer: {
    // justifyContent: 'center',
    // alignItems: 'center', doesn't work
    width: '100%',
    // marginHorizontal: '10%',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    // elevation: 30,
  },
  buttonContainer: {
    marginHorizontal: '10%',
    width: '80%',
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '88%',
    paddingBottom: 17,
    paddingTop: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 30,
    marginBottom: 25,
    marginTop: 25,
  },

  infoContainer: {
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
  },

  secondaryButton: {
    backgroundColor: '#eae0d4',
  },
  indicator: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  requirementText: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    // backgroundColor: '#eee',
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  distance: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 17,
    fontFamily: 'Manrope-Medium',
    width: '80%',
    letterSpacing: 0.4, // increase letter spacing
  },
  title: {
    marginBottom: 10,
    color: '#2F2E41',
    fontSize: 27,
    fontWeight: '700',
    width: '95%',
    marginHorizontal: '4',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5,
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
    letterSpacing: 0.4, // increase letter spacing
  },
});
