import React, {useState} from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Linking, StyleSheet, ImageBackground, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


const API_KEY = 'd0b69496c18e463f888a273cb521ea9f';

const SearchScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
      navigation.navigate('Login')
  }

    const [selectedTab, setSelectedTab] = useState(0);

    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);

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

  

  return (
    <ImageBackground source={require('../assets/background.jpg')}
          style={{height: '100%', width: '100%', opacity: 0.97, flex: 1,}}>
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.icon}>
                <Text style={{fontSize: 25, fontWeight:"900", color: 'white'}}>Search</Text>
                <Icon name="bars" color="white" size={30} />
            </View>
             
                <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: '700', color: 'white', fontSize: 25 }}>Search Country</Text>
                            <TextInput 
                                style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }}
                                placeholder="Enter country..."
                                placeholderTextColor="white" 
                                value={country} 
                                onChangeText={(text) => setCountry(text)} 
                            />
                            <Button title="Search" onPress={handleSubmitCountry} color="white" />
                        </View>

                    <ScrollView>

                        {loading && <Text style={{ color: 'white' }}>Loading...</Text>}

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

export default SearchScreen;
