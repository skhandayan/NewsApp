import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from "react-native"; 
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  const handleSignIn = () => {
    navigation.navigate('Root');
  };
  
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  

  return (
        <View>
        <ImageBackground source={require('../assets/background.jpg')}
          style={{height: '100%', width: '100%', opacity: 0.97}}>
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
                placeholder="Email"
                value={email}
                setValue={setEmail}
              />
              <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
              />

              <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={toggleRememberMe}>
                  <View style={[styles.checkbox, rememberMe && styles.checked]} />
                </TouchableOpacity>
                <Text style={styles.text}>
                  Remember me
                </Text>
                <TouchableOpacity>
                  <Text style={styles.text}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <CustomButton
                text="Login"
                onPress={handleSignIn}
              />

              <View style={{
                flexDirection: 'row',
                justifyContent:'center',
                paddingBottom: 10,
                paddingTop: 50,
                paddingLeft: 25,}}>
                <Text style={{color: 'white'}}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                onPress={handleSignUp}>
                    <Text style={{paddingLeft: 5, color: 'white', fontWeight: 'bold'}}>Create one</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'white',
    color: 'white'
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
    paddingRight: 25,
  }
});
