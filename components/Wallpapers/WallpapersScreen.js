


import React, { useState,useEffect,useRef } from "react";
import { View, StatusBar, StyleSheet, Text,ScrollView ,Animated} from "react-native";
import FetchImages from "./FetchImages";
import {useFonts} from 'expo-font'

const WallpapersScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const statusBarStyle = backgroundColor === "black" ? "light-content" : "dark-content";
  const [fontsLoaded]=useFonts({
    // 'ProtestGuerrilla':require('../../assets/fonts/ProtestGuerrilla-Regular.ttf'),
    'Matemasie-Regular':require('../../assets/fonts/Matemasie/Matemasie-Regular.ttf')
  })

  const bounceValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1.2, 
      friction: 2, 
      tension: 100, 
      useNativeDriver: true, 
    }).start();
  }, []);
  
  if(!fontsLoaded){
    return (
      <Text style={styles.fontheading}>Wallpapers</Text>
    )
  }
  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
      />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Animated.Text style={[styles.heading,{transform:[{scale:bounceValue}]}]}>Wallpapers</Animated.Text>

      </View>
      <FetchImages />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 30,
    // fontFamily:'ProtestGuerrilla-Regular',
    fontFamily:'Matemasie-Regular',
    marginTop: '3%',
    color: 'white',
    // color:'#cf6025'
  },
  fontheading:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '6%',
    color:'white'
  }
});

export default WallpapersScreen;
