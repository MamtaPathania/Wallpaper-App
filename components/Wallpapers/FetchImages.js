

// import React, { useEffect, useState } from "react";
// import axios from "react-native-axios";
// import { FlatList, View, Alert, StyleSheet, Share, ActivityIndicator, Platform, Linking,Text } from "react-native";
// import Card from "./Card";
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';

// const FetchImages = () => {
//   const [imagesData, setImagesData] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`http://192.168.1.16:4080/getupload-img`);
//         // console.log(response.data,"response")
//         setImagesData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data.");
//       } finally {
//         setLoading(false); 
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

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={imagesData}
//         renderItem={({ item }) => (
//           <Card
//             imageUrl={item.url}
//             onDownload={() => handleDownload(item.url)} 
//             onShare={() => handleShare(item.url)}  
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
// });

// export default FetchImages;



// import React, { useEffect, useState } from "react";
// import axios from "react-native-axios";
// import { FlatList, View, Alert, StyleSheet, Share, ActivityIndicator, Platform, Linking, Text } from "react-native";
// import Card from "./Card";
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';

// const FetchImages = () => {
//   const [imagesData, setImagesData] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`http://192.168.1.16:4080/getupload-img`);
//         console.log(response.data, "resposee====");
//         setImagesData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data.");
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDownload = async (imageUrl) => {
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

//   const handleShare = async (imageUrl) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       await Share.share({ url: fileUri });
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Features</Text>
//       <FlatList
//         data={imagesData.slice(0, 12)}  
//         renderItem={({ item }) => (
//           <View style={styles.cardContainer}>
//             <Card
//               imageUrl={item.url}
//               onDownload={() => handleDownload(item.url)} 
//               onShare={() => handleShare(item.url)}  
//             />
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal={true} 
//         contentContainerStyle={styles.listContainer} 
//         showsHorizontalScrollIndicator={false} 
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   heading: {
//     color: 'white',
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   cardContainer: {
//     width: 150, // Set the width of each card
//     height: 200, // Set the height of each card
//     marginHorizontal: 5, // Optional: Add some margin between cards
//   },
// });

// export default FetchImages;



// import React, { useEffect, useState } from "react";
// import axios from "react-native-axios";
// import { FlatList, View, Alert, StyleSheet, Share, ActivityIndicator, Platform, Linking, Text,ScrollView } from "react-native";
// import Card from "./Card";
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';

// const FetchImages = () => {
//   const [imagesData, setImagesData] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`http://192.168.1.16:4080/getupload-img`);
//         setImagesData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchData();
//   }, []);

//   const getRandomVideos = (data, count) => {
//     const shuffled = data.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const categories = ["Spiritual", "Nature"]; 

//   const handleDownload = async (imageUrl) => {
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
//       console.error('Error downloading or saving the image details data:', error.message);
//       Alert.alert('Error', 'Failed to save the image.');
//     }
//   };

//   const handleShare = async (imageUrl) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
//       await FileSystem.downloadAsync(imageUrl, fileUri);

//       await Share.share({ url: fileUri });
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   const randomVideos = getRandomVideos(imagesData, 10);
//   console.log(randomVideos,"===random")

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Featured</Text>
//       <FlatList
//         data={randomVideos}
//         renderItem={({ item }) => (
//           <View style={styles.cardContainer}>
//             <Card
//               imageUrl={item.url}
//               onDownload={() => handleDownload(item.url)} 
//               onShare={() => handleShare(item.url)}  
//             />
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal={true} 
//         contentContainerStyle={styles.listContainer} 
//         showsHorizontalScrollIndicator={false} 
//       />

      
//       {categories.map((category) => {
//         const categoryVideos = imagesData.filter(item => item.category === category);

//         if (categoryVideos.length === 0) {
//           return null; 
//         }

//         return (
//           <View key={category} style={styles.categoryContainer}>
//             <View style={styles.mainheading}>
//               <Text style={styles.categoryHeading}>{category}</Text>
//               <Text style={styles.seeMore}>See More</Text>
              
//             </View>
            
//             <FlatList
//               data={categoryVideos.slice(0, 5)}
//               renderItem={({ item }) => (
//                 <View style={styles.cardContainer}>
//                   <Card
//                     imageUrl={item.url}
//                     onDownload={() => handleDownload(item.url)} 
//                     onShare={() => handleShare(item.url)}  
//                   />
//                 </View>
//               )}
//               keyExtractor={(item, index) => index.toString()}
//               horizontal={true} 
//               contentContainerStyle={styles.listContainer} 
//               showsHorizontalScrollIndicator={false} 
//             />
//           </View>
//         );
//       })}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   heading: {
//     color: 'white',
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   categoryHeading: {
//     color: 'white',
//     fontSize: 20,
//     marginTop: 20,
//   },
//   seeMore: {
//     color: 'white',
//     fontSize: 16,
//   },
//   listContainer: {
//     paddingVertical: 10,
//   },
//   cardContainer: {
//     width: 150,
//     height: 200,
//     marginHorizontal: 5,
//   },
//   categoryContainer: {
//     marginBottom: 10,
//   },
//   mainheading: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 2,
//   }
// });

// export default FetchImages;

import React, { useEffect, useState } from "react";
import axios from "react-native-axios";
import { FlatList, View, Alert, StyleSheet, Share, ActivityIndicator, Platform, Linking, Text, ScrollView, TouchableOpacity } from "react-native";
import Card from "./Card";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { GetUploadImage } from "../../api/api";

const FetchImages = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigation = useNavigation();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        setImagesData(response.data);
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

  const categories = ["Nature","Spiritual","Popular"]; 

  const handleDownload = async (imageUrl) => {
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

      const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
      await FileSystem.downloadAsync(imageUrl, fileUri);

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Success', 'Image saved to your photos!');
    } catch (error) {
      console.error('Error downloading or saving the image details data:', error.message);
      Alert.alert('Error', 'Failed to save the image.');
    }
  };

  const handleShare = async (imageUrl) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${imageUrl.split('/').pop()}`;
      await FileSystem.downloadAsync(imageUrl, fileUri);

      await Share.share({ url: fileUri });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

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
              imagesData={randomVideos} // Ensure you pass the correct data here
              onDownload={() => handleDownload(item.url)}
              onShare={() => handleShare(item.url)}
              onPress={() => handleCardPress(item, index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />

      {categories.map((category) => {
        const categoryVideos = imagesData.filter(item => item.category === category);

        if (categoryVideos.length === 0) {
          return null; 
        }

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
              renderItem={({ item, index }) => (
                <View style={styles.cardContainer}>
                  <Card 
                    imageUrl={item.url}
                    index={index} 
                    imagesData={categoryVideos} 
                    onDownload={() => handleDownload(item.url)}
                    onShare={() => handleShare(item.url)}
                    onPress={() => handleCardPress(item, index)} 
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
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
    marginTop:'20%',
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
    marginBottom:20,
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
    color:'white'
  },
  seeMore: {
    color: 'white',
    fontSize:18,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
});

export default FetchImages;
