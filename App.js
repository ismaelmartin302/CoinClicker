import { StatusBar } from "expo-status-bar";
import "@expo/metro-runtime";
import React, { useRef } from "react";
import { StyleSheet, View, Image, Pressable, Animated } from "react-native";

const coinPressableImage = require("./assets/coin.svg");

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const sizeInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 80], // in pixels
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={{ width: sizeInterpolation, height: sizeInterpolation }}
        >
          <Image source={coinPressableImage} style={styles.image} />
        </Animated.View>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    imageRendering: "pixelated",
  },
});
