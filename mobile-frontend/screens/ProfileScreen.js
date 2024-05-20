import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            console.log('Retrieved userData:', userData);
            if (userData) {
                const user = JSON.parse(userData);
                console.log('Parsed user:', user);
                if (user && user.email) {
                    setUserEmail(user.email);
                } else {
                    console.warn('Email not found in user data');
                }
            } else {
                console.log('No user data found');
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await supabase.auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={{ height: '100%', width: '100%', opacity: 0.97, flex: 1 }}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Text style={{ fontSize: 25, fontWeight: "900", color: 'white' }}>Profile</Text>
                        <Icon name="bars" color="white" size={30} />
                    </View>
                    <Text style={styles.subtitle}>You are logged in as: {userEmail}</Text>
                    <CustomButton text="Log Out" onPress={handleSignOut} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    title: {
        paddingTop: 25,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    subtitle: {
        paddingTop: 25,
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 25,
    },
    icon: {
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    switch: {
        width: '100%',
        height: 40,
        borderWidth: 0.8,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default ProfileScreen;
