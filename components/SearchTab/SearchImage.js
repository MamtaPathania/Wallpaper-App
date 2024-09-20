import React, { useState, useEffect, Children } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ImageCarousel from './ImageCarousel';
import { storeImageUrl, handleDownload, handleShare } from '../Functions/Functions';

const SearchImage = ({ route }) => {
  const { imageUrl, images,image_id } = route.params;
  // console.log(imageUrl,images,image_id,"===========")
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [initialIndex, setInitialIndex] = useState(0);
  const [storedImages, setStoredImages] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (imageUrl) {
      setCurrentImageUrl(imageUrl);
      const imageIndex = images.findIndex(image => image.url === imageUrl);
      setInitialIndex(imageIndex !== -1 ? imageIndex : 0);
    }
    setLoading(false);

    return () => {
      setCurrentImageUrl('');
    };
  }, [imageUrl]);

  const handleDownloadPress = async () => {
    try {
      await handleDownload(currentImageUrl, (url) => storeImageUrl(url, setStoredImages),image_id);
    } catch (error) {
      Alert.alert('Error', 'Failed to download image');
    }
  };

  const handleSharePress = async () => {
    try {
      await handleShare(currentImageUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SearchHome')}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="white" style={styles.loader} />}

      <ImageCarousel images={images} initialIndex={initialIndex} onImageSelect={setCurrentImageUrl} />

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDownloadPress} style={styles.iconButton}>
          <Ionicons name="download" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSharePress} style={styles.iconButton}>
          <Ionicons name="share-social" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  loader: {
    position: 'absolute',
    zIndex: 2,
  },
});

export default SearchImage;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking,Alert, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
// import { useNavigation } from '@react-navigation/native';
// import ImageCarousel from './ImageCarousel';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SearchImage = ({ route }) => {
//   const { imageUrl, images } = route.params;
//   const [loading, setLoading] = useState(true);
//   const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
//   const [initialIndex, setInitialIndex] = useState(0);
//   const [storedImages, setStoredImages] = useState([]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     if (imageUrl) {
//       setCurrentImageUrl(imageUrl);
//       const imageIndex = images.findIndex(image => image.url === imageUrl);
//       setInitialIndex(imageIndex !== -1 ? imageIndex : 0);
//     }
//     setLoading(false);

//     return () => {
//       setCurrentImageUrl('');
//     };
//   }, [imageUrl]);


//    // Function to store the image URL in AsyncStorage
//    const storeImageUrl = async (currentImageUrl) => {
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
//       if (!imageList.includes(currentImageUrl)) {
//         imageList.push(currentImageUrl);
//         await AsyncStorage.setItem('downloadedImages', JSON.stringify(imageList));
//         Alert.alert('Success', 'Image URL stored successfully!');
//         setStoredImages(imageList); // Update state with new image list
//       }
//     } catch (error) {
//       console.error('Error storing image URL:', error);
//       Alert.alert('Error', 'Failed to store the image URL');
//     }
//   };
  
//   const handleDownload = async () => {
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

//       const fileUri = `${FileSystem.documentDirectory}${currentImageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(currentImageUrl, fileUri);

//       await MediaLibrary.saveToLibraryAsync(fileUri);
//       Alert.alert('Success', 'Image saved to your photos!');
//       await storeImageUrl(currentImageUrl)
//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${currentImageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(currentImageUrl, fileUri);

//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//       Alert.alert('Error', 'Failed to share the image.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SearchHome')}>
//         <Ionicons name="arrow-back" size={30} color="white" />
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="large" color="white" style={styles.loader} />}

//       <ImageCarousel images={images} initialIndex={initialIndex} onImageSelect={setCurrentImageUrl} />

//       <View style={styles.iconContainer}>
//         <TouchableOpacity onPress={handleDownload} style={styles.iconButton}>
//           <Ionicons name="download" size={25} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
//           <Ionicons name="share-social" size={25} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
    
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
//   iconContainer: {
//     position: 'absolute',
//     bottom: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '60%',
//   },
//   iconButton: {
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 50,
//   },
//   loader: {
//     position: 'absolute',
//     zIndex: 2,
//   },
// });

// export default SearchImage;
