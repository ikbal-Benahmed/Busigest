import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import {
  format_price,
  getTurnover,
  removeProduct,
  updateBprice,
  updateQuantity,
  updateSprice,
} from "../backend/functions";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import OutlinedInput from "../Utils/inputs/outlinedInput";

const Productetails = ({
  PRODNAME = "Test Test Test",
  QTE = 0,
  IDPRODUCT = 1,
  BPRICE = 2000,
  SPRICE = 3000,
  navigation,
  route,
}) => {
  route.params
    ? ({ PRODNAME, QTE, IDPRODUCT, BPRICE, SPRICE } = route.params.item)
    : null;
  const [quantity, setQuantity] = useState(QTE);
  const [change, setChange] = useState(0);
  const [bprice, setBprice] = useState();
  const [sprice, setSprice] = useState();
  const [selectedBprice, setSelectedBprice] = useState(BPRICE);
  const [selectedSprice, setSelectedSprice] = useState(SPRICE);
  const [tunover, setTurnover] = useState(0);
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
    console.log("====================================");
    console.log("INSIDE PRODUCT DETAILS");
    console.log("====================================");
    // getTurnover(IDPRODUCT, fetchTunover);
  }, []);
  const fetchTunover = (res) => {
    console.log("====================================");
    console.log(res);
    console.log("====================================");
    setTurnover(res.RESULT);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.deepBlue }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            color: colors.white,
            fontSize: fontSizes.h4,
          }}
        >
          Product details
        </Text>
        <View
          style={{
            marginVertical: sizes[0],
            height: 1,
            backgroundColor: "white",
            wIDPRODUCTth: "85%",
            alignSelf: "center",
          }}
        ></View>
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
            marginBottom: sizes[2],
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            marginTop: sizes[1],
          }}
        >
          <View
            style={{
              marginLeft: sizes[2],
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Text style={styles.title}>Quantity</Text>
              <Text style={styles.subTitle}>{quantity}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View>
              <Text style={styles.title}>Update</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.roundedContainer, { marginRight: sizes[1] }]}
                  onPress={() => {
                    change - 1 + quantity >= 0 ? setChange(change - 1) : null;
                  }}
                >
                  <Ionicons
                    name={"remove"}
                    color={colors.white}
                    size={sizes[2]}
                  ></Ionicons>
                </TouchableOpacity>
                <View
                  style={{
                    borderRadius: sizes[0],
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 1,
                    padding: sizes[0],
                  }}
                >
                  <TextInput
                    style={{ fontSize: fontSizes.title }}
                    onChangeText={(value) => {
                      setChange(value);
                    }}
                    keyboardType="number-pad"
                  >
                    {change}
                  </TextInput>
                </View>
                <TouchableOpacity
                  style={[styles.roundedContainer, { marginLeft: sizes[1] }]}
                  onPress={() => setChange(change + 1)}
                >
                  <Ionicons
                    name={"add"}
                    color={colors.white}
                    size={sizes[2]}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: sizes[1] }}>
                <Button
                  mode="contained"
                  dark={true}
                  color={colors.deepBlue}
                  style={{ padding: 4 }}
                  onPress={() => {
                    setQuantity(quantity + change);
                    setChange(0);
                    updateQuantity(IDPRODUCT, quantity + change);
                  }}
                >
                  <Text style={styles.button}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: sizes[1],
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.9 }}>
            <View>
              <Text
                style={{ fontSize: fontSizes.caption, color: colors.darkBlue }}
              >
                Buying Price
              </Text>
              <Text
                style={{ fontSize: fontSizes.h5_1, color: colors.deepBlue }}
              >
                {selectedBprice + " DA"}
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: sizes[4], marginRight: sizes[0] }}>
                <OutlinedInput
                  label="New price"
                  value={bprice ? bprice.toString() : null}
                  placeholder="New buying price"
                  keyboardType="phone-pad"
                  backColor={colors.white}
                  textColor={colors.deepBlue}
                  OnChangeText={(text) => {
                    setBprice(parseFloat(text));
                  }}
                />
              </View>
              <View style={{}}>
                <Button
                  mode="contained"
                  color={colors.deepBlue}
                  style={{}}
                  onPress={() => {
                    bprice
                      ? (updateBprice(IDPRODUCT, bprice),
                        setSelectedBprice(bprice),
                        setBprice())
                      : null;
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.OpenSans_700Bold,
                      fontSize: fontSizes.button,
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: sizes[1],
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.9 }}>
            <View>
              <Text
                style={{ fontSize: fontSizes.caption, color: colors.darkBlue }}
              >
                Selling Price
              </Text>
              <Text
                style={{ fontSize: fontSizes.h5_1, color: colors.deepBlue }}
              >
                {selectedSprice + " DA"}
              </Text>
            </View>
          </View>
          {console.log("MID RENDERED")}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: sizes[4], marginRight: sizes[0] }}>
                <OutlinedInput
                  label="New price"
                  value={sprice ? sprice.toString() : null}
                  placeholder="New selling price"
                  keyboardType="phone-pad"
                  backColor={colors.white}
                  textColor={colors.deepBlue}
                  OnChangeText={(text) => {
                    setSprice(parseFloat(text));
                  }}
                />
              </View>
              <View style={{}}>
                <Button
                  mode="contained"
                  color={colors.deepBlue}
                  style={{}}
                  onPress={() => {
                    sprice
                      ? (updateSprice(IDPRODUCT, sprice),
                        setSelectedSprice(sprice),
                        setSprice())
                      : null;
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.OpenSans_700Bold,
                      fontSize: fontSizes.button,
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: sizes[3] }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={[styles.title, { textAlign: "left" }]}>
                Product's tunover
              </Text>
              <View>
                <Text style={[styles.subTitle, { textAlign: "left" }]}>
                  {tunover ? tunover + " DA" : "Product never sold"}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>Product's tunover</Text>
              <View>
                <Text style={styles.subTitle}>
                  {tunover
                    ? format_price(tunover) + " Da"
                    : "Product never sold"}
                </Text>
              </View>
            </View>
          </View>
          <Button
            style={{ paddingTop: sizes[1] }}
            color={colors.error}
            onPress={() => createTwoButtonAlert()}
          >
            <Text style={styles.buttonContent}>Remove product</Text>
          </Button>
        </View>
      </View>
      {console.log("ALL RENDERED")}
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

export default Productetails;
