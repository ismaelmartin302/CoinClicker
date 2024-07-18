import "@expo/metro-runtime";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Image, Pressable, Animated } from "react-native";
import { Button, ScrollView, Text } from "react-native-web";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const coinPressableImage = require("./assets/coin.svg");
const backgroundColor = "#202020";
const textColor = "#f5f5f5";
const highlightColor = "#ffe95e";
const highlightColorDarken = "#4a4a4a";
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
        <View style={styles.secStats}>
          <View style={styles.secStatsStat}>
            <FontAwesomeIcon icon={faCoins} style={styles.secStatsStatIcon} />
            <Text style={styles.secStatsStatTxt}>{totalPoints}</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.secPress}>
          <Pressable onPress={handlePress}>
            <Animated.View
              style={{ width: sizeInterpolation, height: sizeInterpolation }}
            >
              <Image source={coinPressableImage} style={styles.image} />
            </Animated.View>
          </Pressable>
        </View>
        <ScrollView
          style={styles.secElemScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.secElem}>
            <View style={styles.secElemEleme}>
              <View style={styles.secElemElemeShop}>
                <Pressable style={styles.secElemElemeShopBtn}>
                  <Text style={styles.secElemElemeShopBtnTxt}>Comprar x1</Text>
                </Pressable>
                <View style={styles.secElemElemeShopMultpl}>
                  <Pressable style={styles.secElemElemeShopMultplMultplier}>
                    x1
                  </Pressable>
                  <Pressable style={styles.secElemElemeShopMultplMultplier}>
                    x5
                  </Pressable>
                  <Pressable style={styles.secElemElemeShopMultplMultplier}>
                    x10
                  </Pressable>
                  <Pressable style={styles.secElemElemeShopMultplMultplier}>
                    x100
                  </Pressable>
                </View>
              </View>
              <View style={styles.secElemElemePurchases}></View>
            </View>
            <View style={styles.secElemEleme}></View>
            <View style={styles.secElemEleme}></View>
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
  secStats: {
    width: "fit-content",
    minWidth: "200px",
    height: "100%",
    padding: "1em",
    shadowRadius: 20,
    borderBottomEndRadius: 20,
    // shadowOpacity: 0.5,
  },
  secStatsStat: {
    flexDirection: "row",
    gap: "0.5em",
    alignItems: "center",
  },
  secStatsStatIcon: { color: highlightColor },
  secStatsStatTxt: { color: textColor },
  secPress: {
    minHeight: "10em",
  },
  secElemScroll: {
    width: "100%",
    shadowRadius: 20,
    borderRadius: 20,
    marginBottom: "1em",
  },
  secElem: {
    gap: "1em",
    shadowRadius: 20,
    borderRadius: 20,
  },
  secElemEleme: {
    flexDirection: "row",
    gap: "1em",
    minHeight: "10em",
    padding: "1em",
    shadowRadius: 20,
    borderRadius: 20,
  },
  secElemElemeShop: {
    flex: 1,
    gap: "1em",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secElemElemeShopBtn: {
    backgroundColor: highlightColor,
    padding: ".5em",
    borderRadius: ".5em",
  },
  secElemElemeShopMultpl: {
    flexDirection: "row",
    gap: ".5em",
  },
  secElemElemeShopMultplMultplier: {
    backgroundColor: highlightColorDarken,
    color: "white",
    padding: ".5em",
    borderRadius: ".5em",
  },
  secElemElemePurchases: {
    flex: 2,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "0.2em",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
