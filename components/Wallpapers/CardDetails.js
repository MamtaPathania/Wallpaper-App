import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardDetails = ({ route }) => {
  const { imageurl, data } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageurl }} style={styles.image} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    height:'100%',
  },
  
});

export default CardDetails;
