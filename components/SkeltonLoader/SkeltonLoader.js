// SkeletonLoader.js
import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { View, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <SkeletonContent
      containerStyle={styles.container}
      isLoading={true}
      layout={[
        { key: 'image', width: '100%', height: 150, borderRadius: 8 },
        { key: 'text', width: '100%', height: 20, marginTop: 10, borderRadius: 4 },
      ]}
    >
      <View style={styles.skeleton} />
    </SkeletonContent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150, // Adjust height as needed
  },
  skeleton: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default SkeletonLoader;
