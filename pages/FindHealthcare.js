import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/IconButton';

const Page = () => {
  const navigation = useNavigation(); // used for navigation.navigate()
  return (

    <View style={styles.mainContainer}>
      {/* Empty Component to make buttons in the middle of the screen but not on top,
      easier for user to reach */}
      <View />
      <View style={styles.resourceContainer}>
        <Text style={styles.title}>Find Healthcare</Text>
        <IconButton
          imageSource={require('../assets/wellbeing.png')}
          title="Find Addiction Support"
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('SelectResourceLocation', { category: 'addictionSupport', title: 'Addiction Support' })}
        />
        <IconButton
          imageSource={require('../assets/hand_heart.png')}
          title="Find Mental Support"
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('SelectResourceLocation', { category: 'mental', title: 'Mental Support' })}
        />
        <IconButton
          imageSource={require('../assets/pill.png')}
          title="Find Medical Help"
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('SelectResourceLocation', { category: 'medical', title: 'Medical Help' })}
        />

        <IconButton
          imageSource={require('../assets/tooth.png')}
          title="Find Tooth Care"
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('SelectResourceLocation', { category: 'dental', title: 'Tooth Care' })}
        />
        <IconButton
          imageSource={require('../assets/eye.png')}
          title="Find Eye Doctor"
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('SelectResourceLocation', { category: 'vision', title: 'Eye Doctor' })}
        />

      </View>

      <View />

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
    backgroundColor: '#eae0d4',
  },

  title: {
    marginBottom: 18,
    color: '#2F2E41',
    fontSize: 35,
    fontWeight: '900',
    width: '95%',
  },

});
