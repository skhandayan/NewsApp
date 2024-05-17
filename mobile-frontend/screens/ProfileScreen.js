import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
      navigation.navigate('Login')
  }

    const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ImageBackground source={require('../assets/background.jpg')}
          style={{height: '100%', width: '100%', opacity: 0.97, flex: 1,}}>
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.icon}>
                <Text style={{fontSize: 25, fontWeight:"900", color: 'white'}}>Profile</Text>
                <Icon name="bars" color="white" size={30} />
            </View>

                <Text style={styles.subtitle}>You Login as: </Text>
                <CustomButton
                            text="Log Out"
                            onPress={handleSignOut}
                        />
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
