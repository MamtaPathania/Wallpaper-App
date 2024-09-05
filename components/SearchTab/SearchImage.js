// import React, { useState,useEffect } from 'react';
// import { View, Image, StyleSheet, Dimensions, Alert, TouchableOpacity, Platform, Linking, ActivityIndicator } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import { Ionicons } from '@expo/vector-icons';
// import * as Sharing from 'expo-sharing';
// import { useNavigation } from '@react-navigation/native'; 

// const SearchImage = ({ route }) => {
//   const { imageUrl } = route.params;
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation(); 

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

//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       await MediaLibrary.saveToLibraryAsync(fileUri);
//       Alert.alert('Success', 'Image saved to your photos!');
//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//       Alert.alert('Error', 'Failed to share the image.');
//     }
//   };


//   useEffect(() => {
//     if (Image.prefetch(imageUrl)) {
//       setLoading(false);
//     }
//   }, [imageUrl]);
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SearchHome")}>
//         <Ionicons name="arrow-back" size={30} color="white" />
//       </TouchableOpacity>
      
//       {loading && <ActivityIndicator size="large" color="white" style={styles.loader} />}
      
//       <Image 
//   source={{ uri: imageUrl }} 
//   style={styles.fullImage} 
//   onLoad={() => setLoading(false)}
//   onError={() => {
//     setLoading(false);
//     Alert.alert('Error', 'Failed to load the image.');
//   }}
// />

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
//   fullImage: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//     resizeMode: 'contain',
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

//old alert code =====================================



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking,Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import ImageCarousel from './ImageCarousel';

const SearchImage = ({ route }) => {
  const { imageUrl, images } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [initialIndex, setInitialIndex] = useState(0);
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

  const handleDownload = async () => {
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

      const fileUri = `${FileSystem.documentDirectory}${currentImageUrl.split('/').pop()}`;
      await FileSystem.downloadAsync(currentImageUrl, fileUri);

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Success', 'Image saved to your photos!');
    } catch (error) {
      console.error('Error downloading or saving the image:', error.message);
      Alert.alert('Error', 'Failed to save the image.');
    }
  };

  const handleShare = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${currentImageUrl.split('/').pop()}`;
      await FileSystem.downloadAsync(currentImageUrl, fileUri);

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error sharing:', error.message);
      Alert.alert('Error', 'Failed to share the image.');
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
        <TouchableOpacity onPress={handleDownload} style={styles.iconButton}>
          <Ionicons name="download" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
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
