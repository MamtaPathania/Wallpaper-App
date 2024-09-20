import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, Text } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const ActivityCard = ({ imageUrls }) => {
    const [loading, setLoading] = useState(imageUrls.map(() => true));
    const [modalVisible, setModalVisible] = useState(false);
    const [swiperIndex, setSwiperIndex] = useState(0);

    const reversedImageUrls = [...imageUrls].reverse();

    const handleImageLoad = (index) => {
        const updatedLoading = [...loading];
        updatedLoading[index] = false;
        setLoading(updatedLoading);
    };

    const handleImagePress = (index) => {
        setSwiperIndex(index);
        setModalVisible(true);
    };

    return (
        <View style={styles.card}>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {reversedImageUrls.map((url, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                        <View style={styles.imageContainer}>
                            {loading[index] && (
                                <ShimmerPlaceHolder
                                    shimmerColors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
                                    duration={1000}
                                    LinearGradient={LinearGradient}
                                    style={styles.image}
                                />
                            )}
                            <Image
                                source={{ uri: url }}
                                style={[styles.image, { opacity: loading[index] ? 0 : 1 }]} // Hide image if loading
                                resizeMode="cover"
                                onLoad={() => handleImageLoad(index)}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Full-screen swiper modal for image preview */}
            {modalVisible && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Swiper
                            index={swiperIndex}
                            showsPagination={false}
                            loop={false}
                            onIndexChanged={setSwiperIndex}
                        >
                            {imageUrls.map((url, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: url }}
                                    style={styles.fullscreenImage}
                                    resizeMode="cover"
                                />
                            ))}
                        </Swiper>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    scrollContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    imageContainer: {
        marginHorizontal: 6,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: width * 0.44,
        height: height * 0.4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
    },
    closeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        padding:2
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
    },
});

export default ActivityCard;
