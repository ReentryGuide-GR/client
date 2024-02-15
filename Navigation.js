// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './Menu'; 
import SelectFoodLocationPage from './pages/selectFoodLocation'; 
import MealOrGroceries from './pages/mealOrGroceries'; 

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
        <Stack.Screen name="SelectFoodLocationPage" component={SelectFoodLocationPage} />
        <Stack.Screen name="MealOrGroceries" component={MealOrGroceries} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
