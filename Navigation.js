// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from "./App";
import Menu from "./Menu";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} /> {/* Add Menu Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
