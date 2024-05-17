import React, { useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  { id: 1, color: '#FF5733' },
  { id: 2, color: '#33FF57' },
  { id: 3, color: '#5733FF' },
  // Add more colors as needed
];

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.image, { backgroundColor: item.color }]} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={0}
        initialNumToRender={1}
        onViewableItemsChanged={({ viewableItems }) => {
          setCurrentIndex(viewableItems[0].index);
        }}
      />
      <TouchableOpacity style={styles.buttonLeft} onPress={handlePrev}>
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRight} onPress={handleNext}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width,
    height: 200, // adjust as needed
  },
  buttonLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
  },
  buttonRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NewsCarousel;
