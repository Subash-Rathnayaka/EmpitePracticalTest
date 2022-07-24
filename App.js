/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {SafeAreaView, Text, StyleSheet, useColorScheme} from 'react-native';
import LogInScreen from './src/screens/LogInScreen';
import BottomTab from './src/screens/BottomTab/BottomTab';
import MapScreen from './src/screens/TabScreens/MapScreen/MapScreen';
import WeatherScreen from './src/screens/TabScreens/WeatherScreen/WeatherScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LOGIN" component={LogInScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
