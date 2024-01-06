// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './MainPage'; // Assuming MainPage is your App.js
import Menu from './Menu';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
