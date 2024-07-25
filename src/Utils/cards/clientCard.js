import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Avatar } from "@rneui/themed";
import { colors } from "../../theme/colors";
import { fonts, fontSizes } from "../../theme/fonts";
import { sizes } from "../../theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import { wilayas } from "../../pages/wilayas";
import { format_price, getTotalSpending } from "../../backend/functions";

const Clientcard = ({
  id = 0,
  name = "John Doe",
  amount = "2500",
  city = "Bordj Bou Arerridj",
  phoneN = "0540693123",
  callback,
  onPress,
}) => {
  useEffect(() => {
    totalSpending();
  }, []);
  const [total, setTotal] = useState(0);
  const fetchTotal = (res) => {
    setTotal(res[0].TOTAL);
  };
  const totalSpending = () => {
    getTotalSpending(id, fetchTotal);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={60}
          rounded
          title={
            name.includes(" ")
              ? name.split(" ")[0][0].toUpperCase() +
                name.split(" ")[1][0].toUpperCase()
              : name[0].toUpperCase() + name[1].toUpperCase()
          }
          containerStyle={{ backgroundColor: colors.warning }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
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
          <View style={{ position: "absolute", right: 0, width: "20%" }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${phoneN}`)}
              style={{
                width: "100%",
                backgroundColor: colors.success,
                alignItems: "flex-start",
                justifyContent: "center",
                borderTopLeftRadius: sizes[2] / 2,
              }}
            >
              <Ionicons
                style={{ paddingLeft: sizes[1] }}
                name={"call"}
                color={colors.white}
                size={sizes[2]}
              ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`sms:${phoneN}`);
              }}
              style={{
                width: "100%",
                backgroundColor: colors.warning,
                alignItems: "flex-start",
                justifyContent: "center",
                borderBottomLeftRadius: sizes[2] / 2,
                marginTop: sizes[0],
                zIndex: 1,
              }}
            >
              <Ionicons
                style={{ paddingLeft: sizes[1] }}
                name={"mail"}
                color={colors.white}
                size={sizes[2]}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.subContainer}>
            <Text style={styles.upper}>Total purchases :</Text>
            <Text style={[styles.down, { color: colors.deepBlue }]}>
              {format_price(amount) + " Da"}
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.upper}>City :</Text>
            <Text style={[styles.down, { color: colors.deepBlue }]}>
              {wilayas[city]}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  subContainer: {
    marginHorizontal: sizes[1],
  },
  upper: {
    fontFamily: fonts.robotoLight,
    color: colors.darkBlue,
    fontSize: fontSizes.body,
  },
  down: {
    fontFamily: fonts.robotoBold,
    width: 125,
    fontSize: fontSizes.title,
  },
});

export default Clientcard;
