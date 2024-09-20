// import React, { useState, useEffect } from 'react';
// import axios from 'react-native-axios';
// import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { GetUploadImage } from '../../api/api';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
// import LinearGradient from 'expo-linear-gradient';

// const SearchTab = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`${GetUploadImage}`);
//         const fetchedImages = response.data;
//         // console.log(fetchedImages,'====search fetch----')
//         setImages(fetchedImages);
//         setFilteredImages(fetchedImages.slice(0, 6)); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const query = searchQuery.toLowerCase();
//     const filtered = images.filter(image =>
//       image.name.toLowerCase().includes(query) ||
//       image.category.toLowerCase().includes(query)
//     );
//     setFilteredImages(filtered.slice(0, 9)); 
//   }, [searchQuery, images]);

//   const handleCardPress = (image) => {
//     navigation.navigate('FullImage', { imageUrl: image.url, images: filteredImages,image_id:image.id });
//   };
  
//   const renderImage = (image, index) => (
//     <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(image)}>
//       <ShimmerPlaceHolder
//         visible={!image.loading} // Show shimmer while loading
//         shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
//         duration={1000}
//         LinearGradient={LinearGradient} // Use LinearGradient for shimmer effect
//         style={styles.image}
//       >
//         <Image
//           source={{ uri: image.url }}
//           style={styles.image}
//           resizeMode="contain"
//           onLoadStart={() => {
//             setImages(prevImages => {
//               const newImages = [...prevImages];
//               newImages[index].loading = true;
//               return newImages;
//             });
//           }}
//           onLoad={() => {
//             setImages(prevImages => {
//               const newImages = [...prevImages];
//               newImages[index].loading = false;
//               return newImages;
//             });
//           }}
//         />
//       </ShimmerPlaceHolder>
//       {/* <Text style={styles.name}>{image.name}</Text> */}
//       <Text style={styles.category}>{image.category}</Text>
//     </TouchableOpacity>
//   );

//   return (
    
//     <View style={styles.container}>
//       <View style={styles.topHeading}>
//         <Ionicons name="chevron-back" size={24} color="white" style={styles.icon} onPress={() => navigation.navigate("Wallpapers")} />
//         <Text style={styles.titleheading}>Discover</Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Search by title or category"
//         placeholderTextColor="white"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       <ScrollView style={styles.cardContainer}>
//         <View style={styles.grid}>
//           {filteredImages.map((image, index) => renderImage(image, index))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'black',
//     color: 'white',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//     borderRadius: 10,
//     fontSize: 14,
//     color: 'white',
//   },
//   cardContainer: {
//     flex: 1,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '30%', 
//     marginBottom: 16,
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   category: {
//     fontSize: 14,
//     color: 'white',
//   },
//   topHeading: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 12,
//     marginTop:16,
//   },
//   titleheading: {
//     fontSize: 20,
//     color: 'white',
//   },
//   icon: {
//     position: 'absolute',
//     left: 0,
//     color: 'white',
//   },
// });

// export default SearchTab;


import React, { useState, useEffect } from 'react';
import axios from 'react-native-axios';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GetUploadImage } from '../../api/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';

const SearchTab = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Manage loading state
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${GetUploadImage}`);
        const fetchedImages = response.data;
        setImages(fetchedImages);
        setFilteredImages(fetchedImages.slice(0, 6)); 
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = images.filter(image =>
      image.name.toLowerCase().includes(query) ||
      image.category.toLowerCase().includes(query)
    );
    setFilteredImages(filtered.slice(0, 9)); 
  }, [searchQuery, images]);

  const handleCardPress = (image) => {
    navigation.navigate('FullImage', { imageUrl: image.url, images: filteredImages, image_id: image.id });
  };

  const renderImage = (image, index) => (
    <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(image)}>
      <ShimmerPlaceHolder
        visible={!image.loading} // Show shimmer while loading
        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
        duration={1000}
        LinearGradient={LinearGradient} // Use LinearGradient for shimmer effect
        style={styles.image}
      >
        <Image
          source={{ uri: image.url }}
          style={styles.image}
          resizeMode="contain"
          onLoadStart={() => {
            setImages(prevImages => {
              const newImages = [...prevImages];
              newImages[index].loading = true;
              return newImages;
            });
          }}
          onLoad={() => {
            setImages(prevImages => {
              const newImages = [...prevImages];
              newImages[index].loading = false;
              return newImages;
            });
          }}
        />
      </ShimmerPlaceHolder>
      <Text style={styles.category}>{image.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="white" // Adjust the color to match your design
          style={styles.activityIndicator}
        />
      ) : (
        <>
          <View style={styles.topHeading}>
            <Ionicons name="chevron-back" size={24} color="white" style={styles.icon} onPress={() => navigation.navigate("Wallpapers")} />
            <Text style={styles.titleheading}>Discover</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Search by title or category"
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView style={styles.cardContainer}>
            <View style={styles.grid}>
              {filteredImages.map((image, index) => renderImage(image, index))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 14,
    color: 'white',
  },
  cardContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%', 
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: 'white',
  },
  topHeading: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 16,
  },
  titleheading: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    left: 0,
    color: 'white',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchTab;
