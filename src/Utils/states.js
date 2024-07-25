import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { format_price } from "../backend/functions";

export default function STATES({
  state = "UNPAID",
  size = 35,
  total = undefined,
  onSwitch = undefined,
}) {
  const [the_state, setThe_state] = useState(state);
  const maping = {
    UNPAID: {
      color: colors.error,
      icon: <MaterialIcons name="money-off" size={size} color={colors.white} />,
      text: "Not Paid",
    },
    DELIVERY: {
      color: colors.warning,
      icon: (
        <MaterialCommunityIcons
          name="truck-delivery"
          size={size}
          color={colors.white}
        />
      ),
      text: "On Delivery",
    },
    PAID: {
      color: colors.success,
      icon: <MaterialIcons name="done" size={size} color={colors.white} />,
      text: "Paid",
    },
    CANCELED: {
      color: colors.error,
      icon: <MaterialIcons name="cancel" size={size} color={colors.white} />,
      text: "Canceled",
    },
    REFUNDED: {
      color: colors.error,
      icon: (
        <MaterialCommunityIcons
          name="cash-refund"
          size={size}
          color={colors.white}
        />
      ),
      text: "Refunded",
    },
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (onSwitch) {
          const states = Object.keys(maping);
          const currentIndex = states.indexOf(the_state);
          const nextIndex = (currentIndex + 1) % states.length;
          const nextState = states[nextIndex];
          setThe_state(nextState);
          console.log(nextState);
          onSwitch(nextState);
        }
      }}
      style={{ alignItems: "center", width: 100 }}
    >
      {/* {total !== undefined && (
        <Text
          style={{
            color: maping[the_state].color,
            fontSize: fontSizes.body,
            marginBottom: "2%",
            fontFamily: fonts.robotoBold,
            textAlign: "center",
          }}
        >
          {maping[the_state].text}
        </Text>
      )} */}
      <View
        style={{
          backgroundColor: maping[the_state].color,
          borderRadius: 50,
          padding: size * 0.3,
          justifyContent: "center",
          alignItems: "center",
          // make it a square whatever the width of the next component
          width: size * 1.75,
          height: size * 1.75,
          alignSelf: "center",
        }}
      >
        {maping[the_state].icon}
      </View>
      {total === undefined && (
        <Text
          style={{
            color: maping[the_state].color,
            fontSize: fontSizes.body,
            marginTop: "2%",
            fontFamily: fonts.robotoBold,
            textAlign: "center",
          }}
        >
          {maping[the_state].text}
        </Text>
      )}

      {total !== undefined && (
        <Text
          style={{
            color: maping[the_state].color,
            fontSize: fontSizes.body,
            marginTop: "2%",
            fontFamily: fonts.robotoBold,
            textAlign: "center",
          }}
        >
          {total ? format_price(total) + " Da" : 0 + " Da"}
        </Text>
      )}
    </TouchableOpacity>
  );
}
