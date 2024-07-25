import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { colors } from "../../theme/colors";
import { fonts, fontSizes } from "../../theme/fonts";
import { Entypo } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import {
  format_price,
  updateBprice,
  updateQte,
  updateSprice,
} from "../../backend/functions";
export default function Product_enrCard({
  item = { SPRICE: 0, BPRICE: 0, QTE: 0 },
  remove_item = () => undefined,
  render,
}) {
  const [sprice, setsPrice] = useState(item.SPRICE);
  const [bprice, setbPrice] = useState(item.BPRICE);
  const [validation, setValidation] = useState({ sprice: true, bprice: true });
  const [qte, setQte] = useState(item.QTE);

  const updateQuantity = (qte) => {
    if (qte < 0) {
      alert("Quantity can't be negative");
    } else {
      setQte(qte);
      render();
      updateQte(item.IDENR, qte);
    }
  };
  // return <Text>'HELLO</Text>;

  return (
    <View style={{ marginTop: "2%", paddingRight: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          //   gap: "30%",
          //   paddingRight: "10%",
          //   backgroundColor: colors.success,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.error,
              paddingHorizontal: "3%",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
            onPress={() => remove_item(item.IDENR)}
          >
            <MaterialIcons name="delete-sweep" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={{}}>
            <Text
              style={{
                textAlign: "left",
                color: colors.darkBlue,
              }}
            >
              Buying Price
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 5,
                gap: 2,
              }}
            >
              {validation.bprice == false && (
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text
                    style={{ paddingHorizontal: 2 }}
                    onPress={() => {
                      setbPrice(item.BPRICE);
                    }}
                  >
                    ❌
                  </Text>
                  <Text
                    style={{ paddingHorizontal: 2 }}
                    onPress={() => {
                      setValidation({
                        bprice: true,
                        sprice: validation.sprice,
                      });
                      updateBprice(item.IDENR, bprice);
                      render();
                    }}
                  >
                    ✅
                  </Text>
                </View>
              )}

              <TextInput
                value={format_price(bprice, false)}
                onChangeText={(value) => {
                  // setValidation({ bprice: false, sprice: validation.sprice });
                  setbPrice(value);

                  value == item.BPRICE
                    ? setValidation({ bprice: true, sprice: validation.sprice })
                    : setValidation({
                        bprice: false,
                        sprice: validation.sprice,
                      });
                }}
                keyboardType="number-pad"
                style={{
                  color: colors.deepBlue,
                  fontSize: fontSizes.title,
                  // borderBottomColor: colors.deepBlue,
                  // borderBottomWidth: 1,
                  // width: "30%",
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.robotoMedium,
                  fontSize: fontSizes.title,
                  color: colors.deepBlue,
                }}
              >
                {" "}
                Da
              </Text>
            </View>
            <Text
              style={{
                //   marginTop: "2%",
                fontFamily: fonts.body,
                color: colors.complementary,
              }}
            >
              {new Date(item.DATE).toDateString()}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: "left", color: colors.darkBlue }}>
            Selling Price
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 5,
              gap: 2,
            }}
          >
            {validation.sprice === false && (
              <View style={{ flexDirection: "row", gap: 2 }}>
                <Text
                  style={{ paddingHorizontal: 2 }}
                  onPress={() => {
                    setValidation({ sprice: true, bprice: validation.bprice });
                    setsPrice(item.SPRICE);
                  }}
                >
                  ❌
                </Text>
                <Text
                  style={{ paddingHorizontal: 2 }}
                  onPress={() => {
                    setValidation({ sprice: true, bprice: validation.bprice });
                    updateSprice(item.IDENR, sprice);
                    render();
                  }}
                >
                  ✅
                </Text>
              </View>
            )}

            <TextInput
              value={format_price(sprice, false)}
              onChangeText={(value) => {
                setsPrice(value);
                value == item.SPRICE
                  ? setValidation({ sprice: true, bprice: validation.bprice })
                  : setValidation({ sprice: false, bprice: validation.bprice });
              }}
              keyboardType="number-pad"
              style={{
                color: colors.deepBlue,
                fontSize: fontSizes.title,
                // borderBottomColor: colors.deepBlue,
                // borderBottomWidth: 1,
                // width: "30%",
              }}
            />
            <Text
              style={{
                fontFamily: fonts.robotoMedium,
                fontSize: fontSizes.title,
                color: colors.deepBlue,
              }}
            >
              {" "}
              Da
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: "left", color: colors.darkBlue }}>
            Quantity
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              gap: Platform.OS == "ios" ? "5%" : 0,
              paddingTop: 5,
            }}
          >
            <Entypo
              name="minus"
              size={18}
              color={qte > 0 ? colors.darkBlue : colors.gray5}
              onPress={() => {
                qte > 0 ? updateQuantity(qte - 1) : undefined;
              }}
            />
            <TextInput
              value={qte.toString()}
              onChangeText={updateQuantity}
              keyboardType="number-pad"
              style={{
                color: colors.deepBlue,
                fontSize: fontSizes.title,
                // borderBottomColor: colors.deepBlue,
                // borderBottomWidth: 1,
                textAlign: "center",
              }}
            />
            <Entypo
              name="plus"
              size={18}
              color={colors.darkBlue}
              onPress={() => updateQuantity(qte + 1)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
