import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import ActivityCard from './ActivityCard'; 
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const MoreScreen = () => {
  const navigation =useNavigation()
    const imageUrls = [
        'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
        'https://cdn.pixabay.com/photo/2023/10/20/03/36/mushrooms-8328101_1280.jpg',
        'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
        'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_1280.jpg',
        'https://cdn.pixabay.com/photo/2023/10/20/03/36/mushrooms-8328101_1280.jpg'
    ];

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

            {/* Rendering Activity Cards with static images */}
            <View style={styles.cardsContainer}>
                <ActivityCard imageUrls={imageUrls} />
            </View>
            
            <Text style={styles.Recentheading}>Your content</Text>
            <TouchableOpacity style={styles.activityContainer} onPress={()=>navigation.navigate("Favorites")}>
                <Entypo name="heart" size={30} color="white" />
                <Text style={styles.iconText}>Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityContainer} onPress={()=>navigation.navigate("Downloads")}>
                <Octicons name="download" size={30} color="white" />
                <Text style={styles.iconText}>Downloads</Text>
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
      flexDirection:'row',
      // marginTop:40,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    logo: {
        width: width * 0.3,
        height: height * 0.17,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '12%',
        color: 'white',
        marginHorizontal:'12%',
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
});

export default MoreScreen;
