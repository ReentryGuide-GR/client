// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './Menu'; 
import SelectResourceLocation from './pages/SelectResourceLocation'; 
import MealOrGroceries from './pages/MealOrGroceries'; 
import ResourceLocation from './pages/ResourceLocation'; 

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
        <Stack.Screen name="SelectResourceLocation" component={SelectResourceLocation} />
        <Stack.Screen name="MealOrGroceries" component={MealOrGroceries} />
        <Stack.Screen name="ResourceLocation" component={ResourceLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
