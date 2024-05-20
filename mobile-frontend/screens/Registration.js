import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Alert } from "react-native"; 
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { supabase } from "../client";

export default function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password }); // Register user with email and password
      if (error) {
        Alert.alert("Registration Error", error.message);
      } else {
        // Registration successful, update user profile with full name
        await supabase.auth.update({ data: { full_name: fullName } });
        Alert.alert("Registration Successful", "You have been registered successfully!");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')}
          style={{height: '100%', width: '100%', opacity: 0.97, flex: 1,}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Image
                source={require('../assets/LOGO.gif')}
                style={styles.logo}
              />
              <Text style={styles.subtitle}>
                Please enter the required credentials to grant access.
              </Text>
              <CustomInput
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              <CustomButton
                text="Register"
                onPress={handleRegister}
              />
                
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>
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
});
