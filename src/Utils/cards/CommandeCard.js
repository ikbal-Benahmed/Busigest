import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import {
  format_price,
  getClientName,
  getCommandeProducts,
  update_state,
  updateSprice,
} from "../../backend/functions";
import { colors } from "../../theme/colors";
import { fonts, fontSizes } from "../../theme/fonts";
import { sizes } from "../../theme/sizes";
import STATES from "../states.js";

const CommandeCard = ({
  DATECOMM = "15/07/2020",
  CLIENT = 1,
  CLIENTNAME,
  TOTAL = 750,
  IDCOMM = 1,
  item,
  callback,
  onPress,
  parentCallback = () => {
    undefined;
  },
}) => {
  const [client, setClient] = useState(undefined);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCommandeProducts(IDCOMM, (res) => {
      let results = [];
      res.forEach((res) => {
        results.push({
          PRODNAME: res.PRODNAME,
          QUANTITY: res.QUANTITY,
          REMISE: res.REMISE,
        });
      });
      setProducts(results);
    });
    getClientName(CLIENT, (res) => {
      if (res.length != 0) {
        setClient(res[0].NAME);
      }
      // setClient(res[0].NAME);
    });
  }, []);
  setTimeout(() => {
    callback(products, IDCOMM);
  }, 100);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              // flexDirection: "row",
              // alignItems: "center",
              // justifyContent: "space-between",
              // paddingBottom: sizes[0],
              width: "85%",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.robotoBold,
                color: client ? colors.darkBlue : colors.error,
                fontSize: fontSizes.title,
                marginBottom: sizes[0],
              }}
            >
              {client === undefined ? "[DELETED]" : CLIENTNAME}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: Platform.OS == "ios" ? "5%" : 0,
              }}
            >
              <Text style={styles.upper}>Amount: </Text>
              <Text
                style={{
                  fontFamily: fonts.robotoMedium,
                  color: colors.darkBlue,
                  fontSize: fontSizes.body,
                }}
              >
                {format_price(item.TOTAL) + " Da"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: sizes[0] - 4,
            }}
          >
            <Text style={[styles.upper]}>Purchase date</Text>
            <Text style={[styles.down, { width: "56%" }]}>{DATECOMM}</Text>
          </View>
        </View>
        <View style={{ width: "25%" }}>
          <STATES
            state={item.STATE}
            size={20}
            onSwitch={(value) => {
              update_state(IDCOMM, value);
              parentCallback();
            }}
          />
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
  upper: {
    fontFamily: fonts.robotoLight,
    color: colors.darkBlue,
    fontSize: fontSizes.caption,
  },
  down: {
    fontFamily: fonts.robotoBold,
    width: 125,
    color: colors.darkBlue,
    fontSize: fontSizes.caption,
    paddingLeft: sizes[0],
  },
});

export default CommandeCard;
