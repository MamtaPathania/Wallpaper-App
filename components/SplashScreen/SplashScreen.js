import React from "react";
import { View, Image, StyleSheet,Text } from "react-native";
import {useFonts} from 'expo-font'

const SplashScreen = () => {
  const [fontsLoaded]=useFonts({
    'Matemasie':require('../../assets/fonts/Matemasie/Matemasie-Regular.ttf'),

  })

  if(!fontsLoaded){
    return(
      <Text style={styles.fontheading}>Wallpaper</Text>
    )
  }
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
  fontheading:{
    color:'white',
    fontSize:26,
    marginTop:14,
    fontWeight:'bold',
    // fontFamily:'arial',
    fontStyle:'italic'
  },
  heading:{
    fontSize:30,
    fontFamily:'Matemasie',
    color:'white',
    marginTop:'3%'

  }
});

export default SplashScreen;
