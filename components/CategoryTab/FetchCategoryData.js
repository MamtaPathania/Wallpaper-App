// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import axios from 'react-native-axios';
// import { useNavigation } from '@react-navigation/native';
// import { GetUploadImage } from '../../api/api';

// const FetchCategoryData = () => {
//   const [images, setImages] = useState([]);
//   const navigation = useNavigation();
  
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.post(`${GetUploadImage}`);
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   // Get unique categories
//   const uniqueCategories = [...new Set(images.map(image => image.category))];

//   // Filter images to get one per category
//   const categoryImages = uniqueCategories.map(category => 
//     images.find(image => image.category === category)
//   ).filter(Boolean); // Ensure no undefined values

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('CategoryImages', { category: item.category })}
//     >
//       <Image source={{ uri: item.url }} style={styles.image} />
//       <Text style={styles.name}>{item.category}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={categoryImages}
//         renderItem={renderCategory}
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
//   row: {
//     justifyContent: 'space-between',
//   },
//   card: {
//     flex: 1,
//     marginBottom: 16,
//     marginHorizontal: 8, 
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
// });

// export default FetchCategoryData;




import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import { GetUploadImage } from '../../api/api'; // Adjust the import path as necessary

const FetchCategoryData = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Get unique categories
  const uniqueCategories = [...new Set(images.map(image => image.category))];

  // Filter images to get one per category
  const categoryImages = uniqueCategories.map(category => 
    images.find(image => image.category === category)
  ).filter(Boolean); // Ensure no undefined values

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CategoryImages', { category: item.category })}
    >
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.name}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryImages}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: 'black',
  },
  row: {
    justifyContent: 'space-between',
    gap: 2,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dfe5ed',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default FetchCategoryData;
