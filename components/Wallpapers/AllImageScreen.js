import React from "react";
import { View, FlatList, StyleSheet ,Text, TouchableOpacity, Dimensions } from "react-native";
import Card from "./Card";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const AllImageScreen = ({ route }) => {
  const { imagesData, category } = route.params;
  const navigation = useNavigation();

  const filteredImages = category
    ? imagesData.filter(item => item.category === category)
    : imagesData;

  const handleBackPress = () => {
    // console.log("Back button pressed");
    navigation.navigate("Wallpapers");  
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.categoryHeading}>{category}</Text>
      </View>
      
      <FlatList
        data={filteredImages}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <Card
              imageUrl={item.url}
              index={index}
              imagesData={filteredImages}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
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
  cardContainer: {
    flex: 1,
    margin: 5,
    marginTop: 20,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  maincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'black',
    height: height * 0.1, 
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,  
    zIndex: 10,  
    padding: 10,  
  },
  categoryHeading: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 24, 
  },
});

export default AllImageScreen;

