import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import ScrollIndicator from '../components/ScrollIndicator';

const Page = () => {
  const navigation = useNavigation();
  const [contentHeight, setContentHeight] = useState(0);
  const scrollY = useState(new Animated.Value(0))[0];

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onContentSizeChange={(width, height) => setContentHeight(height)}
      >
        <View />
        <View style={styles.resourceContainer}>
          <Text style={styles.title} allowFontScaling={false}>Find Healthcare</Text>
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
      </Animated.ScrollView>
      <ScrollIndicator contentHeight={contentHeight} scrollY={scrollY} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
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
