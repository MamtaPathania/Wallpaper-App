
// import React, { useEffect, useState } from "react";
// import axios from "react-native-axios";
// import { FlatList, View, Alert, StyleSheet, Share, Platform ,Text} from "react-native";
// import StangCard from "./StangCard";
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Permissions from 'expo-permissions';
// import { Linking } from 'react-native';

// const StangbyScreen = () => {
    
//   const [imagesData, setImagesData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`http://192.168.1.16:4080/getupload-img`);
//         setImagesData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data.");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDownload = async (imageUrl) => {
//     try {
//       // Request permission to access the media library
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please grant permission to access photos to download the image.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
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

//       // Download the image to the file system
//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       // Save the image to the photo library
//       await MediaLibrary.saveToLibraryAsync(fileUri);
//       Alert.alert('Success', 'Image saved to your photos!');
//     } catch (error) {
//       console.error('Error downloading or saving the image:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   const handleShare = async (imageUrl) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       await Share.share({
//         url: fileUri,
//       });
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//         <Text style={styles.heading}>Landscape mode</Text>
//       <FlatList
//         data={imagesData}
//         renderItem={({ item }) => (
//           <StangCard
//             imageUrl={item.url}
//             onDownload={() => handleDownload(item.url)} // Download and save the image
//             onShare={() => handleShare(item.url)}  // Sharing the image directly
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={1}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor:'black',
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: '6%',
//     color: 'white',
//     // fontFamily:'Roboto, sans-serif',
//     marginBottom:'4%',
//   },
// });

// export default StangbyScreen;
