import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WeatherScreen from '../TabScreens/WeatherScreen/WeatherScreen';
import MapScreen from '../TabScreens/MapScreen/MapScreen';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Restaurants" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
