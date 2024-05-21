import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Linking, StyleSheet, ImageBackground, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API_KEY = 'd0b69496c18e463f888a273cb521ea9f';

const HomeScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        navigation.navigate('Login')
    }

    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });

    const handleSubmitCountry = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePostNews = async () => {
        try {
            await axios.post('your_backend_api_url/news', formData);
            console.log('News posted successfully:', formData);
        } catch (error) {
            console.error('Error posting news:', error);
        }
    };

    const fetchData = async (selectedCategory) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${selectedCategory}&apiKey=${API_KEY}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <ImageBackground source={require('../assets/background.jpg')}
            style={{height: '100%', width: '100%', opacity: 0.97, flex: 1}}>
            
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.icon}>
                            <Text style={{fontSize: 25, fontWeight:"900", color: 'white'}}>Home</Text>
                            <Icon name="bars" color="white" size={30} />
                        </View>

                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, paddingLeft: 25 }}>Welcome to</Text>

                        <View style={{ alignItems: 'center',}}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 35 }}>FusionTech</Text> news and media
                            </Text>
                        </View>

                        
                        {/* News Form */}
                        <View>
                            {/* <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25,}}>Post News</Text>
                            <TextInput 
                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }}
                                placeholder="Description" 
                                placeholderTextColor="white" // Set placeholder text color here
                                value={formData.description} 
                                onChangeText={(text) => handleInputChange('description', text)} 
                            />
                            <TextInput 
                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }}
                                placeholder="Title" 
                                placeholderTextColor="white" // Set placeholder text color here
                                value={formData.title} 
                                onChangeText={(text) => handleInputChange('title', text)} 
                            />
                            <View style={{ marginTop: 10, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}>
                              <Button 
                                  title="Post News" 
                                  onPress={handlePostNews} 
                                  color="black"
                              />
                          </View> */}

                          <View style={{ marginTop: 20, paddingBottom: 25 }}>
                              <Text style={{ fontWeight: '700', color: 'white', fontSize: 20, paddingBottom: 10, paddingTop: 20 }}>Categories</Text>
                              <View style={{ borderBottomColor: 'white', borderTopColor: 'white', borderLeftColor: 'white', borderWidth: 1 , borderRadius: 5, padding: 5}}>
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                      <View style={{ flexDirection: 'row' }}>
                                          <Button title="Technology" onPress={() => fetchData('technology')} color="white" />
                                          <Button title="Health" onPress={() => fetchData('health')} color="white" />
                                          <Button title="Entertainment" onPress={() => fetchData('entertainment')} color="white" />
                                          <Button title="Sports" onPress={() => fetchData('sports')} color="white" />
                                          <Button title="Science" onPress={() => fetchData('science')} color="white" />
                                          <Button title="Business" onPress={() => fetchData('business')} color="white" />
                                      </View>
                                  </ScrollView>
                              </View>
                          </View>



                        </View>



                        {/* Search Country */}
                        {loading && <Text style={{ color: 'white' }}>Loading...</Text>}

                        <ScrollView>

                        {/* Articles */}
                        {articles.map((article, index) => (
                            <View key={index} style={{ marginTop: 20 }}>
                                {article.urlToImage && <Image source={{ uri: article.urlToImage }} style={{ width: '100%', height: 200 }} />}
                                <Text>{article.author}</Text>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{article.title}</Text>
                                <Text style={{ color: 'white' }}>{article.source.name}</Text>
                                <Text style={{ color: 'white' }}>{article.description}</Text>
                                <Text style={{ color: 'white' }}>date: {article.publishedAt}</Text>
                                <Button title="See News" onPress={() => Linking.openURL(article.url)} color="white" />
                            </View>
                        ))}

                        </ScrollView>


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
        color: 'white',
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
        justifyContent: 'space-between',
    },

    switch: {
        width: '100%',
        height: 40,
        borderWidth: 0.8,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white'
    },
});

export default HomeScreen;
