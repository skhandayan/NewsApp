import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigators';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen path='/login' name="Login" component={LoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen path='/' name="Root" component={TabNavigator} options={{ headerShown: false}} />
            <Stack.Screen path='/signup' name="Signup" component={Registration} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default MainNavigator;
