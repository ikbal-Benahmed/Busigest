import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

const OutlinedInput = ({
  label = "Name....",
  placeholder = "client's name here",
  keyboardType = "default",
  OnChangeText,
  handleBlur,
  backColor = colors.sofBlue,
  textColor = colors.white,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        // onBlur={handleBlur}
        placeholder={label}
        // value={value ? value : null}
        keyboardType={keyboardType}
        onChangeText={OnChangeText}
        outlineColor={colors.white}
        style={{
          backgroundColor: backColor,
          color: "white",
        }}
        activeOutlineColor={colors.deepBlue}
        placeholderTextColor={textColor}
        selectionColor={"white"}
        color={colors.white}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
export default OutlinedInput;
