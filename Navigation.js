// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import MainPage from './Menu'; 
import SelectResourceLocation from './pages/SelectResourceLocation'; 
import MealOrGroceries from './pages/MealOrGroceries'; 
import ResourceLocation from './pages/ResourceLocation'; 
import Transportation from './pages/Transportation'; 

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
          // color="#000"
      />
      <Stack.Navigator
        initialRouteName="MainPage"
        screenOptions={{
          headerShown: false,
          // Customizing the screen transition animation
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="SelectResourceLocation" component={SelectResourceLocation} />
        <Stack.Screen name="MealOrGroceries" component={MealOrGroceries} />
        <Stack.Screen name="ResourceLocation" component={ResourceLocation} />
        <Stack.Screen name="Transportation" component={Transportation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
