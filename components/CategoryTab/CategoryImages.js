import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import { CategoryData } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CategoryImages = ({ route }) => {
  const { category } = route.params;
  const [images, setImages] = useState([]);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading states for each image
  const [shimmerTimeouts, setShimmerTimeouts] = useState({}); // Track timeout for shimmer
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${CategoryData}`, { category });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchImages();
  }, [category]);

  const handleBackPress = () => {
    navigation.navigate('CategoryHome');
  };

  const handleImagePress = (index) => {
    navigation.navigate('CategoryImageCarousel', {
      images: images,
      initialIndex: index,
    });
  };

  const handleImageLoad = (index) => {
    // Clear timeout and stop shimmer when image loads
    clearTimeout(shimmerTimeouts[index]);
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleShimmerTimeout = (index) => {
    setShimmerTimeouts((prev) => ({
      ...prev,
      [index]: setTimeout(() => {
        // If shimmer takes too long, show an ActivityIndicator
        setLoadingStates((prev) => ({ ...prev, [index]: 'timeout' }));
      }, 2000), // Timeout duration can be adjusted
    }));
  };

  const renderImage = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => handleImagePress(index)}>
      <View style={styles.card}>
        {loadingStates[index] === 'timeout' ? (
          <ActivityIndicator size="large" color="white" style={styles.image} />
        ) : (
          <ShimmerPlaceHolder
            visible={!loadingStates[index]} // Show shimmer while loading
            shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            duration={1000}
            LinearGradient={LinearGradient} // Use LinearGradient for shimmer effect
            style={styles.image}
            onLayout={() => handleShimmerTimeout(index)}
          >
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => setLoadingStates((prev) => ({ ...prev, [index]: true }))}
              onLoad={() => handleImageLoad(index)} // Update loading state when image loads
            />
          </ShimmerPlaceHolder>
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{category} Images</Text>
      </View>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  card: {
    flex: 1,
    margin: 4,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CategoryImages;
