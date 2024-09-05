// import React from 'react';
// import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
// import Swiper from 'react-native-swiper';
// import { Ionicons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
// import { useNavigation } from '@react-navigation/native'; 

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const CategoryImageCarousel = ({ route }) => {
//   const { images, initialIndex } = route.params;
//   const navigation = useNavigation(); 

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
//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

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

//   const handleBackPress = () => {
//     navigation.goBack(); // Navigate back to the previous screen
//   };

//   const renderImage = (image, index) => (
//     <View key={index} style={styles.slide}>
//       <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
//       <View style={styles.overlay}>
//         <TouchableOpacity onPress={() => handleDownload(image.url)} style={styles.iconButton}>
//           <Ionicons name="download" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleShare(image.url)} style={styles.iconButton}>
//           <Ionicons name="share-social" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
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
//       >
//         {images.map((image, index) => renderImage(image, index))}
//       </Swiper>
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

import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native'; 

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CategoryImageCarousel = ({ route }) => {
  const { images, initialIndex } = route.params;
  const navigation = useNavigation(); 
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Handle image download
  const handleDownload = async (url) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access photos to download the image.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
      await FileSystem.downloadAsync(url, fileUri);

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Success', 'Image saved to your photos!');
    } catch (error) {
      console.error('Error downloading or saving the image:', error.message);
      Alert.alert('Error', 'Failed to save the image.');
    }
  };

  // Handle image sharing
  const handleShare = async (url) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
      await FileSystem.downloadAsync(url, fileUri);

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error sharing:', error.message);
      Alert.alert('Error', 'Failed to share the image.');
    }
  };

  // Handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  // Render image slide
  const renderImage = (image, index) => (
    <View key={index} style={styles.slide}>
      <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        showsPagination={false}
        index={initialIndex}
        onIndexChanged={(index) => setCurrentIndex(index)} // Update the current index
      >
        {images.map((image, index) => renderImage(image, index))}
      </Swiper>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => handleDownload(images[currentIndex].url)} style={styles.iconButton}>
          <Ionicons name="download" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(images[currentIndex].url)} style={styles.iconButton}>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    height: screenHeight * 0.95,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.95,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth,
    zIndex: 1, 
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
});

export default CategoryImageCarousel;
