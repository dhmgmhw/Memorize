import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from '../pages/DetailPage';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name='DetailPage' component={DetailPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
