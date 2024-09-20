// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';
// import { Ionicons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// const HomeImageCarousel = ({ route, navigation }) => {
//   const { imagesData, startIndex } = route.params;

//   const [storedImages, setStoredImages] = useState([]);

//   // Ensure imagesData is an array and startIndex is a valid index
//   if (!Array.isArray(imagesData) || startIndex < 0 || startIndex >= imagesData.length) {
//     Alert.alert('Error', 'Invalid image data or index.');
//     return null;
//   }

//   // Function to store the image URL in AsyncStorage
//   const storeImageUrl = async (url) => {
//     try {
//       const storedData = await AsyncStorage.getItem('downloadedImages');
//       let imageList = [];
  
//       if (storedData) {
//         try {
//           imageList = JSON.parse(storedData); // Safely parse stored data
//         } catch (error) {
//           console.error('Error parsing stored data:', error);
//           imageList = []; // Reset to an empty array if data is corrupted
//         }
//       }
  
//       // Check if image URL already exists to prevent duplicates
//       if (!imageList.includes(url)) {
//         imageList.push(url);
//         await AsyncStorage.setItem('downloadedImages', JSON.stringify(imageList));
//         Alert.alert('Success', 'Image URL stored successfully!');
//         setStoredImages(imageList); // Update state with new image list
//       }
//     } catch (error) {
//       console.error('Error storing image URL:', error);
//       Alert.alert('Error', 'Failed to store the image URL');
//     }
//   };
  

//   // Load stored image URLs from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadStoredImages = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem('downloadedImages');
//         if (storedData) {
//           setStoredImages(JSON.parse(storedData));
//         }
//       } catch (error) {
//         console.error('Error loading stored images:', error);
//       }
//     };

//     loadStoredImages();
//   }, []);

//   const handleDownload = async (url) => {
//     try {
//       console.log('Attempting to download:', url);
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
//       console.log('Downloading image to:', fileUri);
//       await FileSystem.downloadAsync(url, fileUri);

//       await MediaLibrary.saveToLibraryAsync(fileUri);
//       Alert.alert('Success', 'Image saved to your photos!');
      
//       // Store the image URL in AsyncStorage
//       await storeImageUrl(url);
//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   const handleShare = async (url) => {
//     try {
//       console.log('Attempting to share:', url);
//       const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
//       await FileSystem.downloadAsync(url, fileUri);

//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//       Alert.alert('Error', 'Failed to share the image.');
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
//       <View style={styles.overlay}>
//         <TouchableOpacity onPress={() => handleDownload(item.url)} style={styles.iconButton}>
//           <Ionicons name="download" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleShare(item.url)} style={styles.iconButton}>
//           <Ionicons name="share-social" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="chevron-back" size={30} color="white" />
//       </TouchableOpacity>
//       <SwiperFlatList
//         data={imagesData}
//         renderItem={renderItem}
//         showPagination={false}
//         index={startIndex}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   imageContainer: {
//     width,
//     height,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width,
//     height: height * 0.95,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 30,
//     left: 10,
//     zIndex: 1,
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 80,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width,
//     zIndex: 1,
//   },
//   iconButton: {
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 50,
//   },
// });

// export default HomeImageCarousel;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Alert } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Ionicons } from '@expo/vector-icons';
import { storeImageUrl, handleDownload, handleShare } from '../Functions/Functions'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const HomeImageCarousel = ({ route, navigation }) => {
  const { imagesData, startIndex } = route.params;
  const [storedImages, setStoredImages] = useState([]);

  if (!Array.isArray(imagesData) || startIndex < 0 || startIndex >= imagesData.length) {
    Alert.alert('Error', 'Invalid image data or index.');
    return null;
  }

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

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => handleDownload(item.url, storeImageUrl.bind(null, item.url, setStoredImages),item.id)} style={styles.iconButton}>
          <Ionicons name="download" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(item.url)} style={styles.iconButton}>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>
      <SwiperFlatList
        data={imagesData}
        renderItem={renderItem}
        showPagination={false}
        index={startIndex}
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

export default HomeImageCarousel;

