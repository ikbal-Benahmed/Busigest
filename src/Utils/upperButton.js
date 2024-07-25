import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sizes, sizespx } from "../theme/sizes";
import { colors } from "../theme/colors";

import { fonts, fontSizes } from "../theme/fonts";
const Upperbutton = ({ text = "AddCLient", icon, tr, tl, br, bl, onPress }) => {
  return (
    <TouchableOpacity
      style={{ paddingVertical: sizes[2] }}
      underlayColor="white"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          {
            borderTopLeftRadius: tl,
            borderTopRightRadius: tr,
            borderBottomLeftRadius: bl,
            borderBottomRightRadius: br,
          },
        ]}
      >
        <Ionicons name={icon} color={colors.sofBlue} size={sizes[2]}></Ionicons>
        <Text
          style={{
            paddingStart: sizes[1],
            color: colors.sofBlue,
            textAlign: "center",
            fontFamily: fonts.robotoMedium,
            fontSize: fontSizes.h5,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: sizes[0],
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
});

export default Upperbutton;
