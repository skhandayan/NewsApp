import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from "react-native"; 
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/core";

export default function Registration() {
  const [data, onChangeData] = useState(
    {
        "name": "",
        "email": "",
        "password": "",
        "re_password": ""
    }
  )

  const navigation = useNavigation();


  const handleSignIn = () => {
    navigation.navigate('Home');
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
                value={data.name}
                setValue={(name) => {
                    onChangeData({
                        ...data,
                        "name" : name
                    })
                }}
              />

              <CustomInput
                placeholder="Email"
                value={data.email}
                setValue={(email) => {
                    onChangeData({
                        ...data,
                        "email" : email
                    })
                }}
              />

              <CustomInput
                placeholder="Password"
                value={data.password}
                secureTextEntry={true}
                setValue={(password) => {
                    onChangeData({
                        ...data,
                        "password" : password
                    })
                }}
              />

              <CustomInput
                placeholder="Retype Password"
                value={data.re_password}
                secureTextEntry={true}
                setValue={(re_password) => {
                    onChangeData({
                        ...data,
                        "re_password" : re_password
                    })
                }}
              />

              <CustomButton
                text="Register"
                onPress={() => {
                  navigation.navigate('Root');
                }}
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
    borderColor: 'black',
    borderRadius: 5,
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'black',
    color: 'white'
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
    paddingRight: 25,
  }
});
