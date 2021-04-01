import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainPage from '../pages/MainPage';
import AddDiaryPage from '../pages/AddDiaryPage';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === 'MainPage') {
            iconName += 'today-outline';
          } else if (route.name === 'AddDiaryPage') {
            iconName += 'camera-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#2B272A' : '#795D5C'}
              size={33}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          backgroundColor: 'transparent',
          height: 70,
          paddingTop: 7,
          shadowColor: '#091B31',
          shadowOffset: {
            width: 1,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen name='MainPage' component={MainPage} />
      <Tabs.Screen name='AddDiaryPage' component={AddDiaryPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
