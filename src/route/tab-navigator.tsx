import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import History from '../screens/History';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
  );
}