// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MyProfileScreen from '../screens/MyProfileScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SubmitScreen from '../screens/SubmitScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Browse">
        <Stack.Screen name="My Profile" component={MyProfileScreen} />
        <Stack.Screen name="Browse" component={BrowseScreen} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
