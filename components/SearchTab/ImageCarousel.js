// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';
// import Swiper from 'react-native-swiper';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const ImageCarousel = ({ images, onImageSelect, initialIndex = 0 }) => {
//   return (
//     <Swiper
//       style={styles.wrapper}
//       showsButtons={false}
//       loop={false}
//       showsPagination={false}
//       index={initialIndex}  
//       onIndexChanged={(index) => onImageSelect(images[index].url)}
//     >
//       {images.map((image, index) => (
//         <View key={index} style={styles.slide}>
//           <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
//         </View>
//       ))}
//     </Swiper>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     height: screenHeight * 0.95,
//   },
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: screenWidth,
//     height: screenHeight * 0.95,
//   },
// });

// export default ImageCarousel;

import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageCarousel = ({ images = [], onImageSelect, initialIndex = 0 }) => {
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
        }
      }}
    >
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
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
});

export default ImageCarousel;

