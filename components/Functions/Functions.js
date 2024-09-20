
import { Alert, Platform, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios'
import { SaveDownloadedImage } from '../../api/api';

export const storeImageUrl = async (url, setStoredImages) => {
  try {
    const storedData = await AsyncStorage.getItem('downloadedImages');
    let imageList = [];

    if (storedData) {
      try {
        imageList = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        imageList = [];
      }
    }

    if (!imageList.includes(url)) {
      imageList.push(url);
      await AsyncStorage.setItem('downloadedImages', JSON.stringify(imageList));
      // Alert.alert('Success', 'Image URL stored successfully!');
      setStoredImages(imageList);
    }
  } catch (error) {
    console.error('Error storing image URL:', error);
    Alert.alert('Error', 'Failed to store the image URL');
  }
};

// export const handleDownload = async (url, storeImageUrl) => {
//   try {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission Required',
//         'Please grant permission to access photos to download the image.',
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
//       return;
//     }

//     const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
//     await FileSystem.downloadAsync(url, fileUri);
//     await MediaLibrary.saveToLibraryAsync(fileUri);
//     Alert.alert('Success', 'Image saved to your photos!');
//     await storeImageUrl(url);
//   } catch (error) {
//     console.error('Error downloading or saving the image:', error.message);
//     Alert.alert('Error', 'Failed to save the image.');
//   }
// };

export const handleDownload = async (url, storeImageUrl, image_id) => {
  try {
    // Request media library permissions
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

    // Download the image
    const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
    await FileSystem.downloadAsync(url, fileUri);
    
    // Save to media library
    await MediaLibrary.saveToLibraryAsync(fileUri);
    Alert.alert('Success', 'Image saved to your photos!');
    
    // Save the image URL locally
    await storeImageUrl(url);

    await saveDownloadToDatabase(url, image_id);
  } catch (error) {
    console.error('Error downloading or saving the image:', error.message);
    Alert.alert('Error', 'Failed to save the image');
  }
};

// Function to save the download info to the database
const saveDownloadToDatabase = async (url, image_id) => {
  try {
    const response = await axios.post(
      SaveDownloadedImage,
      { url, image_id },
      { timeout: 10000 } // 10 seconds timeout
    );
    // console.log(response,"=====saved to db");
    if (response.status === 200) {
      console.log('Download saved to the database successfully.');
    } else {
      console.error('Failed to save download to the database:', response.data);
    }
  } catch (error) {
    console.error('Error making API call to save download:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response from server');
  }
};

export const handleShare = async (url) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
    await FileSystem.downloadAsync(url, fileUri);
    await Sharing.shareAsync(fileUri);

    // Save the shared image URL in AsyncStorage
    const storedData = await AsyncStorage.getItem('sharedImages');
    let sharedImageList = [];

    if (storedData) {
      try {
        sharedImageList = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing shared image data:', error);
        sharedImageList = [];
      }
    }

    if (!sharedImageList.includes(url)) {
      sharedImageList.push(url);
      await AsyncStorage.setItem('sharedImages', JSON.stringify(sharedImageList));
      // No need to call setSharedImages here, as we'll fetch data in the SharedScreen
    }

  } catch (error) {
    console.error('Error sharing:', error.message);
    Alert.alert('Error', 'Failed to share the image.');
  }
};

