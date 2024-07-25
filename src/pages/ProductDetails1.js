import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  add_product_enr,
  format_price,
  getProductenr,
  getStock_value,
  getTurnover,
  openDB,
  readQuery,
  remove_enr,
  removeProduct,
  updateBprice,
  updateQuantity,
  updateSprice,
} from "../backend/functions";

import { FlatList } from "react-native";
import Product_enrCard from "../Utils/cards/Product_enrCard";
import { Fontisto } from "@expo/vector-icons";

const Productetails1 = ({
  PRODNAME = "Test Test Test",
  QTE = 0,
  IDPRODUCT = 1,
  BPRICE = 2000,
  SPRICE = 3000,
  navigation,
  route,
}) => {
  route
    ? route.params
      ? ({ PRODNAME, QTE, IDPRODUCT, BPRICE, SPRICE } = route.params.item)
      : null
    : null;
  const [enr, setEnr] = useState([]);
  const [render, setrender] = useState(false);
  const [tunover, setTurnover] = useState(0);
  const [stock_value, setStock_value] = useState(0);
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Deleting " + PRODNAME + "",
      `Are you sure you want to delete ${PRODNAME} from your products ?`,
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            removeProduct(IDPRODUCT);
            navigation.goBack();
          },
        },
      ]
    );

  useEffect(() => {
    getTurnover(IDPRODUCT, fetchTunover);
    getStock_value(IDPRODUCT, setStock_value);
    getProductenr(IDPRODUCT, setEnr);
  }, [render]);
  const fetchTunover = (res) => {
    setTurnover(res[0].RESULT);
  };
  const get_all_enr = () => {
    const db = openDB();
    readQuery(`SELECT * FROM PRODUCT_ENR`, db, (res) => {
      setEnr(res);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.deepBlue }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: fonts.robotoBold,
            color: colors.white,
            fontSize: fontSizes.h4,
          }}
        >
          Product details
        </Text>
      </View>

      <View style={styles.vue}>
        <View
          style={{
            backgroundColor: colors.deepBlue,
            borderRadius: sizes[1],
            padding: sizes[0],
            justifyContent: "center",
            width: "60%",
            marginTop: sizes[2],
            marginBottom: sizes[1],
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.robotoBold,
              color: colors.white,
              fontSize: fontSizes.h5_1,
            }}
          >
            {PRODNAME}
          </Text>
        </View>
        <View style={{ color: "red", flex: 0.6 }}>
          <FlatList
            data={enr}
            renderItem={({ item }) => {
              // const [bprice, setBprice] = useState();
              // const [sprice, setSprice] = useState();
              // const [quantity, setQuantity] = useState();
              return (
                <Product_enrCard
                  item={item}
                  remove_item={(id) => {
                    remove_enr(id);
                    getProductenr(IDPRODUCT, setEnr);
                  }}
                  render={() => setrender(!render)}
                />
              );
            }}
            keyExtractor={(item) => item.IDENR.toString()}
            contentContainerStyle={
              {
                // flex: 1,
                // padding: 4,
              }
            }
            style={{}}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: "2%",
            flexDirection: "row",
            alignItems: "baseline",
            gap: Platform.OS == "ios" ? "5%" : 10,
          }}
          onPress={() => {
            add_product_enr(IDPRODUCT);

            getProductenr(IDPRODUCT, setEnr);
          }}
        >
          <Fontisto
            name="shopping-basket-add"
            size={25}
            color={colors.complementary}
          />
          <Text
            style={{
              fontFamily: fonts.body,
              color: colors.darkBlue,
              fontSize: fontSizes.title,
            }}
          >
            New Stock
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: sizes[3],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              width: "95%",
            }}
          >
            <View>
              <Text style={[styles.title, { textAlign: "left" }]}>
                Product's tunover
              </Text>
              <View>
                <Text style={[styles.subTitle, { textAlign: "left" }]}>
                  {tunover
                    ? format_price(tunover, false) + " Da"
                    : "Product never sold"}
                </Text>
              </View>
            </View>
            <View>
              <Text style={[styles.title, { textAlign: "right" }]}>
                Stock Value
              </Text>
              <View>
                <Text style={[styles.subTitle, { textAlign: "right" }]}>
                  {stock_value
                    ? format_price(stock_value[0].VALUE, false) + " Da"
                    : "Product never sold"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={{ position: "absolute", bottom: "5%" }}
          color={colors.error}
          onPress={() => createTwoButtonAlert()}
        >
          <Text style={styles.buttonContent}>Remove product</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: colors.sofBlue,
    borderColor: colors.white,
    borderWidth: 1,
    color: colors.white,
  },
  roundedContainer: {
    borderRadius: sizes[0],
    backgroundColor: colors.deepBlue,
    paddingVertical: sizes[0] - 5,
    paddingHorizontal: sizes[0],
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: sizes[4],
    width: sizes[4],
    borderRadius: sizes[4] / 2,
    backgroundColor: colors.sofBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sizes[0],
  },
  buttonContent: {
    fontSize: fontSizes.title,
    color: colors.error,
  },
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "85%",
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes[2],
    borderTopRightRadius: sizes[2],
    alignItems: "center",
  },
  title: {
    color: colors.darkBlue,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
    textAlign: "center",
  },
  button: {
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
    textAlign: "center",
    marginTop: sizes[0],
  },
  subTitle: {
    color: colors.deepBlue,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
    textAlign: "center",
    marginTop: sizes[0],
  },
});

export default Productetails1;
