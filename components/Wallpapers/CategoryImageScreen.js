// CategoryImagesScreen.js

import React,{useState,useEffect} from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'react-native-axios'; 
import Card from './Card'; 
import { GetUploadImage } from '../../api/api';

const CategoryImageScreen = ({ route }) => {
  const { category } = route.params; 
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        setImagesData(response.data.filter(item => item.category === category));
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Images</Text>
      <FlatList
        data={imagesData}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card imageUrl={item.url} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
  },
});

export default CategoryImageScreen;
