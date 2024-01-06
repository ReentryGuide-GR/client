// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './Map'; // Assuming MainPage is your App.js
import Menu from './Menu';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
        <StatusBar
            backgroundColor="#fff"
            barStyle="dark-content"
            // color="#000"
        />
      <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
