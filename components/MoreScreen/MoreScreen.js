

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import ActivityCard from './ActivityCard';

const { width, height } = Dimensions.get('window');

const MoreScreen = () => {
    const navigation = useNavigation();
    const [imageUrls, setImageUrls] = useState([]);
    const [sharedImagesCount, setSharedImagesCount] = useState(0);
    const [downloadsCount, setDownloadsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSavedData = async () => {
            try {
                // Fetch downloaded images
                const storedDownloads = await AsyncStorage.getItem('downloadedImages');
                if (storedDownloads !== null) {
                    const parsedDownloads = JSON.parse(storedDownloads);
                    setImageUrls(parsedDownloads.slice(0, 6)); // Show recent 6 images
                    setDownloadsCount(parsedDownloads.length); // Set downloads count
                } else {
                    setImageUrls([]);
                    setDownloadsCount(0);
                }

                // Fetch shared images
                const storedSharedImages = await AsyncStorage.getItem('sharedImages');
                if (storedSharedImages !== null) {
                    const parsedSharedImages = JSON.parse(storedSharedImages);
                    setSharedImagesCount(parsedSharedImages.length); // Set shared images count
                } else {
                    setSharedImagesCount(0);
                }

            } catch (error) {
                console.error('Error loading saved data:', error);
                setError('Failed to load saved data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedData();
    }, [loading,sharedImagesCount,imageUrls]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="black" />
        </View>
        )
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>; // Show an error message
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainContainer}>
                <Image
                    source={require('../../assets/user.png')}
                    style={styles.logo}
                />
                <Text style={styles.heading}>My Profile</Text>
            </View>

            <Text style={styles.Recentheading}>Recent activity</Text>

            {/* Rendering Activity Cards with images from AsyncStorage */}
            <View style={styles.cardsContainer}>
                <ActivityCard imageUrls={imageUrls} />
            </View>

            <Text style={styles.Recentheading}>Your content</Text>

            <TouchableOpacity style={styles.activityContainer} onPress={() => navigation.navigate("Downloads")}>
                <MaterialCommunityIcons name="download-circle" size={30} color="#4f8ae8" />
                <Text style={styles.iconText}>Downloads ({downloadsCount})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityContainer} onPress={() => navigation.navigate("SharedImages")}>
                <MaterialCommunityIcons name="share-circle" size={30} color="#68a66b" />
                <Text style={styles.iconText}>Shared Images ({sharedImagesCount})</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "black",
    },
    mainContainer: {
        flexDirection: 'row',
    },
    logo: {
        width: width * 0.3,
        height: height * 0.17,
        objectFit: 'contain'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '12%',
        color: 'white',
        marginHorizontal: '12%',
        marginBottom: '4%',
    },
    Recentheading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '6%',
        color: 'white',
        marginBottom: '4%',
    },
    cardsContainer: {
        marginBottom: '1%',
    },
    activityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    iconText: {
        color: 'white',
        marginLeft: 14,
        fontSize: 24,
        fontWeight: '400',
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        marginTop: '50%',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: '50%',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MoreScreen;

