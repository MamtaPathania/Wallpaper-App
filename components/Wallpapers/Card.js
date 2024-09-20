// import React, { useState } from 'react';
// import { StyleSheet, Image, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const Card = ({ imageUrl, index, imagesData }) => {
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   const handlePress = () => {
//     // console.log('Card Pressed with index:', index);
//     navigation.navigate('HomeImageCarousel', { imagesData, startIndex: index });
//   };

//   return (
//     <View style={styles.cardContainer}>
//       <TouchableOpacity onPress={handlePress}>
//         <Image
//           source={{ uri: imageUrl }}
//           style={styles.image}
//           resizeMode="cover"
//           onLoadStart={() => setLoading(true)}
//           onLoad={handleImageLoad}
//         />
//         {loading && <ActivityIndicator size="large" color="black" style={styles.loader} />}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     flex: 1,
//     width: width * 0.4,
//     // backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 10,
//     marginHorizontal: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     alignSelf: 'center',
//     overflow: 'hidden',
//   },
//   image: {
//     width: width * 0.4,
//     height: height * 0.3,
//     borderWidth: 1,
//     // borderColor: '#dfe5ed',
//     borderRadius: 8,
//   },
//   loader: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -20 }, { translateY: -20 }],
//     zIndex: 1,
//   },
// });

// export default Card;

import React, { useState } from 'react';
import { StyleSheet, Image, View, Dimensions, TouchableOpacity, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const { width, height } = Dimensions.get('window');

const Card = ({ imageUrl, index, imagesData }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handlePress = () => {
    navigation.navigate('HomeImageCarousel', { imagesData, startIndex: index });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={handlePress}>
        {/* Shimmer Placeholder for image */}
        <ShimmerPlaceHolder
          shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']} // Custom shimmer skeleton colors
          duration={1000} 
          easing={Easing.linear} //  smooth animation
          reverse={true} 
          visible={!loading} 
          style={styles.shimmer} 
          autoRun={true}
          

        >
          {/* Image that will replace the shimmer once loaded */}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setLoading(true)} // Show shimmer while loading
            onLoad={handleImageLoad} // Hide shimmer once image is loaded
          />
        </ShimmerPlaceHolder>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: width * 0.4,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  image: {
    width: width * 0.4,
    height: height * 0.3,
    borderRadius: 8,
  },
  shimmer: {
    width: width * 0.4,
    height: height * 0.3,
    borderRadius: 8,
    backgroundColor: '#E0E0E0', // Fallback background color

  },
});

export default Card;
