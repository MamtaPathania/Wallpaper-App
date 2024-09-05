import React from "react";
import { View, Image, StyleSheet,Text } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image.png')}
        style={styles.logo}
      />
      <Text style={styles.heading}>Wallpaper</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", 
  },
  logo: {
    width: 150,  
    height: 150,
  },
  heading:{
    color:'white',
    fontSize:26,
    marginTop:14,
    fontWeight:'bold',
    // fontFamily:'arial',
    fontStyle:'italic'
  }
});

export default SplashScreen;
