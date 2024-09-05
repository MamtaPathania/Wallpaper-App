
import React, { useState } from "react";
import { View, StatusBar, StyleSheet, Text,ScrollView } from "react-native";
import FetchImages from "./FetchImages";

const WallpapersScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const statusBarStyle = backgroundColor === "black" ? "light-content" : "dark-content";

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
      />
      <Text style={styles.heading}>Wallpapers</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '6%',
    color: 'white',
  },
});

export default WallpapersScreen;
