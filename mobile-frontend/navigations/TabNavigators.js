import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const handleTabPress = (route, focused, color) => {

        switch (route.name) {
            case 'Home':
                return <Icon name="home" size={20} color={focused ? 'grey' : 'white'} />;
            case 'Search':
                return <Icon name="search" size={20} color={focused ? 'grey' : 'white'} />;
            case 'About Us':
                return <Icon name="user" size={20} color={focused ? 'grey' : 'white'} />;
            default:
                return null;
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'transparent',
                },
                tabBarIcon: ({ focused, color }) => (
                    handleTabPress(route, focused, color)
                ),
            })}

        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="About Us" 
                component={ProfileScreen} 
                options={{ headerShown: false }} 
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
