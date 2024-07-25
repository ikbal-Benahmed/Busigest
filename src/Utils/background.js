import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "react-native-svg";
import { colors } from "../theme/colors";
const Background = () => {
  const colorList = [
    { offset: "100%", color: colors.deepBlue, opacity: "1" },
    { offset: "0%", color: colors.gradientSoftBlue, opacity: "1" },
  ];
  return (
    <View style={styles.background}>
      <LinearGradient colorList={colorList} angle={90} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Background;
