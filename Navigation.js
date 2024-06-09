// Navigation.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import MainMenu from './pages/MainMenu';
import SelectResourceLocation from './pages/SelectResourceLocation';
import MealOrGroceries from './pages/MealOrGroceries';
import FindHealthcare from './pages/FindHealthcare';
import LunchOrDinner from './pages/LunchOrDinner';
import ResourceLocation from './pages/ResourceLocation';
import SelectTransportation from './pages/SelectTransportation';
import ResourceLocationsList from './pages/ResourceLocationsList';
import MoreInfo from './pages/MoreInfo';
import RequestPermission from './pages/RequestPermission';
import ProminentDisclosure from './pages/ProminentDisclosure';
import ImportantNotice from './pages/ImportantNotice';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <StatusBar
      backgroundColor="#fff"
      barStyle="dark-content"
      // color="#000"
    />
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,
        // Customizing the screen transition animation
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="SelectResourceLocation" component={SelectResourceLocation} />
      <Stack.Screen name="MealOrGroceries" component={MealOrGroceries} />
      <Stack.Screen name="FindHealthcare" component={FindHealthcare} />
      <Stack.Screen name="LunchOrDinner" component={LunchOrDinner} />
      <Stack.Screen name="ResourceLocation" component={ResourceLocation} />
      <Stack.Screen name="SelectTransportation" component={SelectTransportation} />
      <Stack.Screen name="ResourceLocationsList" component={ResourceLocationsList} />
      <Stack.Screen name="MoreInfo" component={MoreInfo} />
      <Stack.Screen name="RequestPermission" component={RequestPermission} />
      <Stack.Screen name="ProminentDisclosure" component={ProminentDisclosure} />
      <Stack.Screen name="ImportantNotice" component={ImportantNotice} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
