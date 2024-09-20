// import React, { useState, useEffect } from "react";
// import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
// import Swiper from "react-native-swiper";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// const ImageViewer = ({ route, navigation }) => {
//     const { images, currentImage, updateImages} = route.params; 

//     const [loading, setLoading] = useState(images.map(() => true));
//     const [currentImageIndex, setCurrentImageIndex] = useState(currentImage);

//     useEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <TouchableOpacity
//                     style={styles.deleteButton}
//                     onPress={() => confirmDelete(images[currentImageIndex])}
//                 >
//                     <MaterialIcons name="delete-forever" size={30} color="white" />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation, currentImageIndex]);

//     const handleImageLoad = (index) => {
//         const updatedLoading = [...loading];
//         updatedLoading[index] = false;
//         setLoading(updatedLoading);
//     };

//     const confirmDelete = (imageUri) => {
//         Alert.alert(
//             "Delete Image",
//             "Are you sure you want to delete this image?",
//             [
//                 { text: "Cancel", style: "cancel" },
//                 { text: "Delete", onPress: () => deleteImage(imageUri), style: "destructive" }
//             ],
//             { cancelable: true }
//         );
//     };

//     const deleteImage = async (imageUri) => {
//         try {
//             // Remove the image from AsyncStorage
//             const storedImages = await AsyncStorage.getItem('downloadedImages');
//             let downloads = JSON.parse(storedImages) || [];
//             downloads = downloads.filter((uri) => uri !== imageUri);
//             await AsyncStorage.setItem('downloadedImages', JSON.stringify(downloads));

//             // Update the image list and go back
//             if (updateImages) {
//                 updateImages(downloads);
//             }

//             // Go back after deletion
//             navigation.goBack();
//         } catch (error) {
//             console.error('Error deleting image:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Swiper
//                 style={styles.wrapper}
//                 showsButtons={false}
//                 loop={false}
//                 showsPagination={false}
//                 index={currentImageIndex}
//                 onIndexChanged={(index) => setCurrentImageIndex(index)}
//             >
//                 {images.map((image, index) => (
//                     <View key={index} style={styles.slide}>
//                         <View style={styles.imageContainer}>
//                             <Image
//                                 source={{ uri: image }}
//                                 style={styles.image}
//                                 resizeMode="cover"
//                                 onLoad={() => handleImageLoad(index)}
//                             />
//                             {loading[index] && (
//                                 <ActivityIndicator
//                                     size="large"
//                                     color="#ffffff"
//                                     style={styles.activityIndicator}
//                                 />
//                             )}
//                         </View>
//                     </View>
//                 ))}
//             </Swiper>
//             <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => navigation.goBack()}
//             >
//                 <MaterialIcons name="arrow-back" size={30} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => confirmDelete(images[currentImageIndex])}
//             >
//                 <MaterialIcons name="delete-forever" size={30} color="white" />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black',
//     },
//     wrapper: {
//         height: height * 0.95,
//     },
//     slide: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         position: 'relative',
//     },
//     image: {
//         width: width,
//         height: height * 0.95,
//     },
//     activityIndicator: {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: [{ translateX: -25 }, { translateY: -25 }],
//     },
//     backButton: {
//         position: 'absolute',
//         top: 40,
//         left: 20,
//     },
//     deleteButton: {
//         position: 'absolute',
//         bottom: 20,
//         left: '50%',
//         marginLeft: -20,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         padding: 10,
//         borderRadius: 50,
//     },
// });

// export default ImageViewer;

import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Swiper from "react-native-swiper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ImageViewer = ({ route, navigation }) => {
    const { images, currentImage } = route.params;
    const [loading, setLoading] = useState(images.map(() => true));
    const [currentImageIndex, setCurrentImageIndex] = useState(currentImage);
    const [updatedImages, setUpdatedImages] = useState(images); // Local state for updated images

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(updatedImages[currentImageIndex])}
                >
                    <MaterialIcons name="delete-forever" size={30} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, currentImageIndex, updatedImages]);

    const handleImageLoad = (index) => {
        const updatedLoading = [...loading];
        updatedLoading[index] = false;
        setLoading(updatedLoading);
    };

    const confirmDelete = (imageUri) => {
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete this image?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteImage(imageUri), style: "destructive" }
            ],
            { cancelable: true }
        );
    };

    const deleteImage = async (imageUri) => {
        try {
            // Remove the image from AsyncStorage
            const storedImages = await AsyncStorage.getItem('downloadedImages');
            let downloads = JSON.parse(storedImages) || [];
            downloads = downloads.filter((uri) => uri !== imageUri);
            await AsyncStorage.setItem('downloadedImages', JSON.stringify(downloads));

            // Update the image list locally
            const newImageList = updatedImages.filter((uri) => uri !== imageUri);
            setUpdatedImages(newImageList);

            // If no images left, go back
            if (newImageList.length === 0) {
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                loop={false}
                showsPagination={false}
                index={currentImageIndex}
                onIndexChanged={(index) => setCurrentImageIndex(index)}
            >
                {updatedImages.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                                onLoad={() => handleImageLoad(index)}
                            />
                            {loading[index] && (
                                <ActivityIndicator
                                    size="large"
                                    color="#ffffff"
                                    style={styles.activityIndicator}
                                />
                            )}
                        </View>
                    </View>
                ))}
            </Swiper>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <MaterialIcons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper: {
        height: height * 0.95,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: width,
        height: height * 0.95,
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        marginLeft: -20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 50,
    },
});

export default ImageViewer;
