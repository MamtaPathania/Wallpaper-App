

import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions,ActivityIndicator} from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageCarousel = ({ images = [], onImageSelect, initialIndex = 0 }) => {
  const [loading,setLoading]=useState(true)

  const handleImageLoad=()=>{
    setLoading(false)
  };

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      showsPagination={false}
      index={initialIndex}  
      onIndexChanged={(index) => {
        if (images[index]) {
          onImageSelect(images[index].url);
          setLoading(true)
        }
      }}
    >
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          {loading && (<ActivityIndicator size="large" color="white" style={styles.loader}/>)}
          <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover"
          onLoad={handleImageLoad} 
          onLoadStart={()=>setLoading(true)}/>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: screenHeight * 0.95,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.95,
  },
  loader:{
    position:'absolute',
    top:'50%',
    left:'50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],

  }
});

export default ImageCarousel;

