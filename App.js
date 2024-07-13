import "@expo/metro-runtime";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Image, Pressable, Animated } from "react-native";
import { ScrollView, Text } from "react-native-web";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const coinPressableImage = require("./assets/coin.svg");
const backgroundColor = "#202020";
const textColor = "#f5f5f5";
const highlightColor = "#ffe95e";
export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [totalPoints, setTotalPoints] = useState(0);
  const [exponentValue] = useState(1);

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
    setTotalPoints(totalPoints + exponentValue);
  };

  const sizeInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 80], // in pixels
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sectionStats}>
          <View style={styles.sectionStatsStat}>
            <FontAwesomeIcon
              icon={faCoins}
              style={styles.sectionStatsStatIcon}
            />
            <Text style={styles.sectionStatsStatText}>{totalPoints}</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.sectionPressable}>
          <Pressable onPress={handlePress}>
            <Animated.View
              style={{ width: sizeInterpolation, height: sizeInterpolation }}
            >
              <Image source={coinPressableImage} style={styles.image} />
            </Animated.View>
          </Pressable>
        </View>
        <ScrollView
          style={styles.sectionElementsScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionElements}>
            <View style={styles.sectionElementsElement}></View>
            <View style={styles.sectionElementsElement}></View>
            <View style={styles.sectionElementsElement}></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: "5em",
    backgroundColor: backgroundColor,
    width: "100%",
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  main: {
    width: "100%",
    height: "100%",
    gap: "5em",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 4,
    paddingStart: "1em",
    paddingEnd: "1em",
  },
  sectionStats: {
    width: "fit-content",
    minWidth: "200px",
    height: "100%",
    padding: "1em",
    shadowRadius: 20,
    borderBottomEndRadius: 20,
    // shadowOpacity: 0.5,
  },
  sectionStatsStat: {
    flexDirection: "row",
    gap: "0.5em",
    alignItems: "center",
  },
  sectionStatsStatIcon: { color: highlightColor },
  sectionStatsStatText: { color: textColor },
  sectionPressable: {
    minHeight: "10em",
  },
  sectionElementsScroll: {
    width: "100%",
    shadowRadius: 20,
    borderRadius: 20,
    marginBottom: "1em",
  },
  sectionElements: {
    gap: "1em",
    shadowRadius: 20,
    borderRadius: 20,
  },
  sectionElementsElement: {
    minHeight: "10em",
    padding: "1em",
    shadowRadius: 20,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
  },
  props: {
    resizeMode: "contain",
  },
});
