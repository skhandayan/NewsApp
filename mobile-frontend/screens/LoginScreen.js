import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Alert } from "react-native"; 
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { supabase } from "../client";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const storeUserData = async (user) => {
        try {
            const userData = JSON.stringify(user);
            await AsyncStorage.setItem('userData', userData);
            console.log('User data stored successfully');
        } catch (error) {
            console.error("Error storing user data:", error.message);
        }
    };

    const handleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                Alert.alert("Login Error", error.message);
            } else {
                console.log('Supabase signIn response:', data); // Log the response data to inspect it
                Alert.alert("Login Successful", "Welcome back!");
                // Store user data in AsyncStorage
                await storeUserData(data.user); // Ensure we are storing the correct user object
                // Navigate to the Root screen
                navigation.navigate('Root');
            }
        } catch (error) {
            console.error("Error signing in:", error.message);
        }
    };

    return (
        <View>
            <ImageBackground source={require('../assets/background.jpg')} style={{ height: '100%', width: '100%', opacity: 0.97 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.container}>
                            <Image source={require('../assets/LOGO.gif')} style={styles.logo} />
                            <Text style={styles.subtitle}>Please enter the required credentials to grant access.</Text>
                            <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
                            <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                            <CustomButton text="Login" onPress={handleSignIn} />
                            <View style={styles.bottomContainer}>
                                <Text style={styles.text}>Don't have an account?</Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.linkText}>Create one</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 320,
        height: 333,
    },
    subtitle: {
        paddingTop: 25,
        fontSize: 13,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 50,
    },
    text: {
        fontSize: 13,
        fontWeight: '400',
        color: 'white',
    },
    linkText: {
        paddingLeft: 5,
        color: 'white',
        fontWeight: 'bold',
    }
});
