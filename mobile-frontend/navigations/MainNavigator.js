import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigators';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const MainNavigator = () => {
    const [initialRoute, setInitialRoute] = useState('Login');
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setInitialRoute('Root');
                }
            } catch (error) {
                console.error("Error checking user session:", error.message);
            } finally {
                setIsCheckingSession(false);
            }
        };

        checkUserSession();
    }, []);

    if (isCheckingSession) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Registration} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;
