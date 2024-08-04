import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { fonts } from "react-native-elements/dist/config";
import { colors } from "../../theme/colors";
import { fontSizes } from "../../theme/fonts";
import { sizes } from "../../theme/sizes";
import { format_price } from "../../backend/functions";
import languages from "../Translation/translation";
import expressions from "../Translation/references";

const Productcard = ({
  name = "FreeFire Topup",
  bprice = "500",
  sPrice = "750",
  quantity = 30,
  onPress,
}) => {
  console.log("==========bprice ==========================");
  console.log(bprice);
  console.log("====================================");
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                width: 250,
                fontFamily: fonts.robotoBlack,
                color: colors.darkBlue,
                fontSize: fontSizes.h5,
                paddingLeft: sizes[1],
                paddingBottom: sizes[0],
              }}
            >
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.upper}>
              {languages.t(expressions.buying_price)}
            </Text>
            <Text style={styles.down}>
              {format_price(bprice) + ` ${languages.t(expressions.da)}`}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.upper}>
              {languages.t(expressions.selling_price)}
            </Text>
            <Text style={styles.down}>
              {format_price(sPrice) + ` ${languages.t(expressions.da)}`}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", paddingRight: sizes[1] }}>
          <Text style={styles.upper}>{languages.t(expressions.quantity)}</Text>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontFamily: fonts.robotoBold,

              fontSize: fontSizes.title,
            }}
          >
            {quantity}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.gradientSoftBlue,
    margin: sizes[0],
    padding: sizes[0],
    backgroundColor: colors.gray6,
  },
  upper: {
    fontFamily: fonts.robotoLight,
    color: colors.darkBlue,
    fontSize: fontSizes.title,
  },
  down: {
    fontFamily: fonts.robotoBold,
    width: 125,
    fontSize: fontSizes.title,
    paddingLeft: sizes[1],
  },
});

export default Productcard;
