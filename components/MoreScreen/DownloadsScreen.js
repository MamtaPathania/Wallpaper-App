import React, { useEffect, useState } from "react";
import { FlatList, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

const DownloadsScreen = () => {
    const [savedImages, setSavedImages] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchSavedImages = async () => {
            try {
                const storedDownloads = await AsyncStorage.getItem('downloadedImages');
                if (storedDownloads !== null) {
                    let downloads;
                    try {
                        downloads = JSON.parse(storedDownloads);
                    } catch (error) {
                        console.error('Error parsing saved images:', error);
                        downloads = [];
                        await AsyncStorage.removeItem('downloadedImages');
                    }
                    setSavedImages(downloads.reverse());
                } else {
                    setSavedImages([]);
                }
            } catch (error) {
                console.error('Error loading saved images:', error);
                setError('Failed to load saved images');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedImages();
    }, []);

    const deleteImage = async (imageUri) => {
        try {
            const updatedImages = savedImages.filter((item) => item !== imageUri);
            setSavedImages(updatedImages);
            await AsyncStorage.setItem('downloadedImages', JSON.stringify(updatedImages));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const confirmDelete = (imageUri) => {
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete this image from Downloads?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteImage(imageUri), style: "destructive" }
            ],
            { cancelable: true }
        );
    };

    const handleImagePress = (index) => {
        navigation.navigate("DownloadedImageSwipper", {
            images: savedImages,
            currentImage: index,
            // onDelete: (uri) => {
            //     confirmDelete(uri);
            //     navigation.goBack();  
            // },
            // updateImages: (updatedImages) => {
            //     setSavedImages(updatedImages);
            //     AsyncStorage.setItem('downloadedImages', JSON.stringify(updatedImages));
            // }
        });
    };

    const handleImageLoadStart = (uri) => {
        setLoadingStates(prevState => ({ ...prevState, [uri]: true }));
    };

    const handleImageLoadEnd = (uri) => {
        setLoadingStates(prevState => ({ ...prevState, [uri]: false }));
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="black" />
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

    if (savedImages.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Images Downloaded</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={savedImages}
                renderItem={({ item, index }) => (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => handleImagePress(index)}>
                            <ShimmerPlaceholder
                                visible={!loadingStates[item]}
                                shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                                duration={1000}
                                LinearGradient={LinearGradient}
                                style={styles.image}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={styles.image}
                                    resizeMode="cover"
                                    onLoadStart={() => handleImageLoadStart(item)}
                                    onLoadEnd={() => handleImageLoadEnd(item)}
                                    onError={() => handleImageLoadEnd(item)}
                                />
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => confirmDelete(item)}
                        >
                            <MaterialIcons name="delete-forever" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'black',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    imageContainer: {
        flex: 1,
        margin: 5,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: height * 0.4,
        marginBottom: 10,
        borderRadius: 8,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 20,
        right: 6,
        backgroundColor: '#e1e4e8',
        padding: 5,
        borderRadius: 18,
    },
});

export default DownloadsScreen;
