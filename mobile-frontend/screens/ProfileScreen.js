import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');
    const initialAuthors = [
        { id: 1, lastname: 'Handayan', firstname: 'Sean Kirk', grade: 99 },
        { id: 2, lastname: 'Balasabas', firstname: 'Metchlyr', grade: 99 },
        { id: 3, lastname: 'Langomes', firstname: 'Kyle', grade: 99 },
        { id: 4, lastname: 'Timbang', firstname: 'Jerald', grade: 99 },
      ];
    
      const [authors, setAuthors] = useState(initialAuthors);
      const [newAuthor, setNewAuthor] = useState({ lastname: '', firstname: '', grade: '' });
    
      const handleInputChange = (name, value) => {
        setNewAuthor({ ...newAuthor, [name]: value });
      };
    
      const addAuthor = () => {
        const id = authors.length + 1;
        const updatedAuthors = [...authors, { id, ...newAuthor }];
        setAuthors(updatedAuthors);
        setNewAuthor({ lastname: '', firstname: '', grade: '' });
      };
    
      const deleteAuthor = (id) => {
        const updatedAuthors = authors.filter((author) => author.id !== id);
        setAuthors(updatedAuthors);
      };

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
            <View style={styles.root}>
      <View style={styles.container}>
 <View style={styles.icon}>
                        <Text style={{ fontSize: 25, fontWeight: "900", color: 'white' }}>Authors</Text>
                        <Icon name="bars" color="white" size={30} />
                    </View>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Lastname</Text>
              <Text style={styles.headerText}>Firstname</Text>
              <Text style={styles.headerText}>Grade</Text>
              <Text style={styles.headerText}>Action</Text>
            </View>
            {authors.map((author) => (
              <View key={author.id} style={styles.tableRow}>
                <Text style={styles.cell}>{author.lastname}</Text>
                <Text style={styles.cell}>{author.firstname}</Text>
                <Text style={{color: 'white', fontSize: 13,  paddingRight: 45}}>{author.grade}</Text>
                <TouchableOpacity onPress={() => deleteAuthor(author.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.addAuthorContainer}>
          <Text style={styles.text}>Add New Author</Text>
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            value={newAuthor.lastname}
            onChangeText={(text) => handleInputChange('lastname', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Firstname"
            value={newAuthor.firstname}
            onChangeText={(text) => handleInputChange('firstname', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Grade"
            value={newAuthor.grade}
            onChangeText={(text) => handleInputChange('grade', text)}
          />
          <TouchableOpacity onPress={addAuthor} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Author</Text>
          </TouchableOpacity>

 <Text style={styles.subtitle}>You are logged in as: {userEmail}</Text>
                    <CustomButton text="Log Out" onPress={handleSignOut} />
        </View>
      </View>
    </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 25,
      },
    container: {
        alignSelf: 'center',
        width: '100%',
        borderRadius: 5,
        paddingVertical: 20,
      },
      text: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        paddingBottom: 10,
      },
      tableContainer: {
        paddingHorizontal: 10,
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
      },
      headerText: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
      },
      tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 8,
      },
      cell: {
        flex: 1,
        color: 'white',
        fontSize: 13,
      },
      deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      deleteText: {
        color: 'white',
        fontWeight: 'bold',
      },
      addAuthorContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
      },
      input: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
      },
      addButton: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },

    icon: {
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
