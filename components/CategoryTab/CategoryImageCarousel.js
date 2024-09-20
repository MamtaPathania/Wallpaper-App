

// import React, { useState } from 'react';
// import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
// import Swiper from 'react-native-swiper';
// import { Ionicons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
// import { useNavigation } from '@react-navigation/native'; 
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const CategoryImageCarousel = ({ route }) => {
//   const { images, initialIndex } = route.params;
//   const navigation = useNavigation(); 
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   const [storedImages, setStoredImages] = useState([]);



//    // Function to store the image URL in AsyncStorage
//    const storeImageUrl = async (url) => {
//     try {
//       const storedData = await AsyncStorage.getItem('downloadedImages');
//       let imageList = [];
  
//       if (storedData) {
//         try {
//           imageList = JSON.parse(storedData); 
//         } catch (error) {
//           console.error('Error parsing stored data:', error);
//           imageList = []; 
//         }
//       }
  
//       // Check if image URL already exists to prevent duplicates
//       if (!imageList.includes(url)) {
//         imageList.push(url);
//         await AsyncStorage.setItem('downloadedImages', JSON.stringify(imageList));
//         Alert.alert('Success', 'Image URL stored successfully!');
//         setStoredImages(imageList); 
//       }
//     } catch (error) {
//       console.error('Error storing image URL:', error);
//       Alert.alert('Error', 'Failed to store the image URL');
//     }
//   };
  
//   // Handle image download
//   const handleDownload = async (url) => {
//     try {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please grant permission to access photos to download the image.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Open Settings',
//               onPress: () => {
//                 if (Platform.OS === 'ios') {
//                   Linking.openURL('app-settings:');
//                 } else {
//                   Linking.openSettings();
//                 }
//               },
//             },
//           ]
//         );
//         return;
//       }

//       const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
//       await FileSystem.downloadAsync(url, fileUri);

//       await MediaLibrary.saveToLibraryAsync(fileUri);

//       Alert.alert('Success', 'Image saved to your photos!');
//       await storeImageUrl(url);

//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   // Handle image sharing
//   const handleShare = async (url) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
//       await FileSystem.downloadAsync(url, fileUri);

//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//       Alert.alert('Error', 'Failed to share the image.');
//     }
//   };

//   // Handle back navigation
//   const handleBackPress = () => {
//     navigation.goBack(); // Navigate back to the previous screen
//   };

//   // Render image slide
//   const renderImage = (image, index) => (
//     <View key={index} style={styles.slide}>
//       <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//         <Ionicons name="chevron-back" size={30} color="white" />
//       </TouchableOpacity>
//       <Swiper
//         style={styles.wrapper}
//         showsButtons={false}
//         loop={false}
//         showsPagination={false}
//         index={initialIndex}
//         onIndexChanged={(index) => setCurrentIndex(index)} // Update the current index
//       >
//         {images.map((image, index) => renderImage(image, index))}
//       </Swiper>
//       <View style={styles.overlay}>
//         <TouchableOpacity onPress={() => handleDownload(images[currentIndex].url)} style={styles.iconButton}>
//           <Ionicons name="download" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleShare(images[currentIndex].url)} style={styles.iconButton}>
//           <Ionicons name="share-social" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   wrapper: {
//     height: screenHeight * 0.95,
//   },
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: screenWidth,
//     height: screenHeight * 0.95,
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: screenWidth,
//     zIndex: 1, 
//   },
//   iconButton: {
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 50,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 30,
//     left: 10,
//     zIndex: 1,
//   },
// });

// export default CategoryImageCarousel;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Alert } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Ionicons } from '@expo/vector-icons';
import { storeImageUrl, handleDownload, handleShare } from '../Functions/Functions'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const CategoryImageCarousel = ({ route, navigation }) => {
  const { images, initialIndex } = route.params;
  const [storedImages, setStoredImages] = useState([]);

  // Load stored images from AsyncStorage
  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const storedData = await AsyncStorage.getItem('downloadedImages');
        if (storedData) {
          setStoredImages(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading stored images:', error);
      }
    };

    loadStoredImages();
  }, []);

  // Handle back navigation
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Render image item
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => handleDownload(item.url, storeImageUrl.bind(null, item.url, setStoredImages),item.id)}
          style={styles.iconButton}
        >
          <Ionicons name="download" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShare(item.url)}
          style={styles.iconButton}
        >
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>
      <SwiperFlatList
        data={images}
        renderItem={renderItem}
        showPagination={false}
        index={initialIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: height * 0.95,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width,
    zIndex: 1,
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});

export default CategoryImageCarousel;
