import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button as ButtonP } from "react-native-paper";
import { colors } from "../theme/colors";

import { fontSizes } from "../theme/fonts";

export const LastButton = ({ title = "Nouveau", onPress }) => {
  return (
    <ButtonP mode="contained" color={colors.white} onPress={onPress}>
      <Text style={{ fontSize: fontSizes.title, color: colors.deepBlue }}>
        {title}
      </Text>
    </ButtonP>
  );
};

const styles = StyleSheet.create({});

export default LastButton;
