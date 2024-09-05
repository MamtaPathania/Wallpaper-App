import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get('window');

const ActivityCard = ({ imageUrls }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.card}>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {imageUrls.map((url, index) => (
                        <Image
                            key={index}
                            source={{ uri: url }}
                            style={styles.image}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    image: {
        width: width * 0.3,
        height: height * 0.3,
        borderRadius: 10,
        marginHorizontal: 6,
    },
});

export default ActivityCard;
