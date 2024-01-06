// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from "./App";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      {/* <StatusBar
        backgroundColor="#EDE7E7"
        barStyle="dark-content"
        color="#000"
     /> */}
      <Stack.Navigator initialRouteName="MainPage" component={MainPage} screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
