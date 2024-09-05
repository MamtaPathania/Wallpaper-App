import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import { CategoryData } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CategoryImages = ({ route }) => {
  const { category } = route.params;
  const [images, setImages] = useState([]);
  console.log(images, "images==========");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${CategoryData}`, { category });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchImages();
  }, [category]);

  const handleBackPress = () => {
    navigation.navigate('CategoryHome'); 
  };

  const handleImagePress = (index) => {
    navigation.navigate('CategoryImageCarousel', {
      images: images,
      initialIndex: index,
    });
  };

  const renderImage = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => handleImagePress(index)}>
      <View style={styles.card}>
        <Image source={{ uri: item.url }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{category} Images</Text>
      </View>
      <FlatList 
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  card: {
    flex: 1,
    margin: 4,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CategoryImages;


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import axios from 'react-native-axios';
// import { CategoryData } from '../../api/api';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const CategoryImages = ({ route }) => {
//   const { category } = route.params;
//   const [images, setImages] = useState([]);
//   const navigation = useNavigation();
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.post(`${CategoryData}`, { category });
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching category images:', error);
//       }
//     };

//     fetchImages();
//   }, [category]);

//   const handleBackPress = () => {
//     navigation.navigate('CategoryHome'); 
//   };

//   const renderImage = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.url }} style={styles.image} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackPress}>
//           <Ionicons name="chevron-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.title}>{category} Images</Text>
//       </View>
//       <FlatList 
//         data={images}
//         renderItem={renderImage}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2} 
//         columnWrapperStyle={styles.row} 
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'black',
//   },
//   header: {
//     marginTop:16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginLeft: 10,
    
//   },
//   card: {
//     flex: 1,
//     margin: 4,
//     padding: 5,
//     borderRadius: 8,
//     backgroundColor: 'rgba(0, 0, 0, 0.35)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   image: {
//     width: "100%",
//     height: 150,
//     borderRadius: 8,
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
// });

// export default CategoryImages;
