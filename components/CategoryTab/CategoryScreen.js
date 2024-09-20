import React, { useState } from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import FetchCategoryData from './FetchCategoryData'; // Import the FetchCategoryData component

const CategoryScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState('black');
  const statusBarStyle = backgroundColor === 'black' ? 'light-content' : 'dark-content';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      <Text style={styles.heading}>Categories</Text>
      <FetchCategoryData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '6%',
    color: 'white',
  },
});

export default CategoryScreen;


