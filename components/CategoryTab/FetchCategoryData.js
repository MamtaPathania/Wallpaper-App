import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'react-native-axios';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';
import { GetUploadImage } from '../../api/api';

const FetchCategoryData = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // For data loading
  const [loadingStates, setLoadingStates] = useState({}); // For shimmer loading of each image
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false); // Stop the main loading spinner once data is fetched
      }
    };

    fetchImages();
  }, []);

  // Get unique categories
  const uniqueCategories = [...new Set(images.map(image => image.category))];

  // Filter images to get one per category
  const categoryImages = uniqueCategories.map(category =>
    images.find(image => image.category === category)
  ).filter(Boolean); // Ensure no undefined values

  const handleImageLoad = (index) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CategoryImages', { category: item.category })}
    >
      <ShimmerPlaceHolder
        visible={!loadingStates[index]} // Show shimmer while loading
        style={styles.imageShimmer}
        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
      >
        <Image
          source={{ uri: item.url }}
          style={styles.image}
          onLoadStart={() => setLoadingStates(prev => ({ ...prev, [index]: true }))} // Start shimmer
          onLoad={() => handleImageLoad(index)} // Stop shimmer when image loads
          resizeMode="cover"
        />
      </ShimmerPlaceHolder>
      <Text style={styles.name}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryImages}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  row: {
    justifyContent: 'space-between',
    gap: 2,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 4,
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dfe5ed',
  },
  imageShimmer: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FetchCategoryData;
