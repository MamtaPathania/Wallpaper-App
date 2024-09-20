
import React, { useEffect, useState } from "react";
import axios from "react-native-axios";
import {
  FlatList,
  View,
  Alert,
  StyleSheet,
  Share,
  ActivityIndicator,
  Platform,
  Linking,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import Card from "./Card";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { DistinctCategory, GetUploadImage } from "../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleDownload, handleShare } from "../Functions/Functions";

const FetchImages = () => {
  const [imagesData, setImagesData] = useState([]);
  const [categories,setCategories] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  // const categories = ["Nature", "Spiritual", "Popular"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        // console.log(response.data,"=response====")
        setImagesData(response.data);
        
        // Fetch distinct categories
        const categoryResponse = await axios.get(`${DistinctCategory}`);
        // console.log(categoryResponse,"catgeoy===")
        const distinctCategories = categoryResponse.data.map(item => item.category);
        setCategories(distinctCategories); // Set categories dynamically
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomVideos = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // const SaveDownloadedImages = async (imageUri) => {
  //   console.log("donloafs====")
  //   try {
  //     const storedDownloads = await AsyncStorage.getItem('downloadedImages');
  //     let downloads = storedDownloads ? JSON.parse(storedDownloads) : [];
  //      console.log(downloads,"======downloads=======")
  //     if (downloads.length >= 10) {
  //       downloads.shift(); // Remove the oldest if more than 10 images
  //     }

  //     downloads.push(imageUri);
  //     await AsyncStorage.setItem('downloadedImages', JSON.stringify(downloads));
  //   } catch (error) {
  //     console.error('Error saving downloaded images:', error);
  //   }
  // };


  // const handleDownload = async (imageUrl) => {
  //   try {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert(
  //         'Permission Required',
  //         'Please grant permission to access photos to download the image',
  //         [
  //           { text: 'Cancel', style: 'cancel' },
  //           {
  //             text: 'Open Settings',
  //             onPress: () => {
  //               if (Platform.OS === 'ios') {
  //                 Linking.openURL('app-settings:');
  //               } else {
  //                 Linking.openSettings();
  //               }
  //             },
  //           },
  //         ]
  //       );
  //       // return;
  //     }

  //     const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
  //     const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
  //     console.log(uri,"====file uri====")

  //     await MediaLibrary.saveToLibraryAsync(uri);
  //     await SaveDownloadedImages(uri);

  //     Alert.alert('Success', 'Image saved to your photos and local storage!');
  //   } catch (error) {
  //     console.error('Error downloading or saving the image:', error.message);
  //     Alert.alert('Error', 'Failed to save the image');
  //   }
  // };

  // const handleShare = async (imageUrl) => {
  //   try {
  //     const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
  //     await FileSystem.downloadAsync(imageUrl, fileUri);
  //     await Share.share({ url: fileUri });
  //   } catch (error) {
  //     console.error('Error sharing:', error.message);
  //   }
  // };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="white" />
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

  const randomVideos = getRandomVideos(imagesData, 6);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Featured</Text>
      
      <FlatList
        data={randomVideos}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <Card
              imageUrl={item.url}
              index={index}
              imagesData={randomVideos}
              onDownload={() => handleDownload(item.url,item.id)}
              onShare={() => handleShare(item.url)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />

      {categories.map((category) => {
        const categoryVideos = imagesData.filter(item => item.category === category);
        if (categoryVideos.length === 0) return null;

        return (
          <View key={category} style={styles.categoryContainer}>
            <View style={styles.mainheading}>
              <Text style={styles.categoryHeading}>{category}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AllImages', { imagesData, category })}>
                <Text style={styles.seeMore}>See More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={categoryVideos.slice(0, 5)}
              renderItem={({ item, index }) =>{
                // console.log(item.id)  

                return (

                <View style={styles.cardContainer}>
                  <Card 
                    imageUrl={item.url}
                    index={index}
                    imagesData={categoryVideos}
                    onDownload={() => handleDownload(item.url,item.id)}
                    onShare={() => handleShare(item.url)}
                  />
                </View>
              )}}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={styles.listContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      })}
    </ScrollView>
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
    marginTop: '60%',
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  cardContainer: {
    marginRight: 10,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  mainheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  seeMore: {
    // color: 'white',
    // color:'#cb8cf5',
    fontWeight:'bold',
    color:'#d67a49',
    fontSize: 18,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
});

export default FetchImages;
