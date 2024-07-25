import { Formik } from "formik";
import React from "react";
import { Alert, Keyboard, Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { addProduct } from "../backend/functions";
import Product from "../Icons/Product";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import OutlinedInput from "../Utils/inputs/outlinedInput";
import { TouchableWithoutFeedback } from "react-native";

const NewProduct = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.deepBlue,
        }}
      >
        <View style={styles.circle}>
          <Product />
        </View>
        <View style={styles.vue}>
          <Text style={styles.title}>New product</Text>
          <Formik
            initialValues={{
              productName: "",
              bprice: 0,
              sprice: 0,
              quantity: 0,
            }}
            onSubmit={(values) => {
              if (
                values.productName.trim() === "" ||
                values.bprice === 0 ||
                values.sprice === 0
              ) {
                alert("Please fill all information");
              } else {
                if (parseFloat(values.sprice) < parseFloat(values.bprice)) {
                  alert("Selling price must be greater than the buying price");
                } else {
                  addProduct(
                    values.productName,
                    values.bprice,
                    values.sprice,
                    values.quantity
                  );
                  setTimeout(() => {
                    navigation.goBack();
                  }, 1000);
                }
              }
            }}
          >
            {(props) => (
              <View
                style={{
                  flex: 1,
                  width: "90%",
                }}
              >
                <OutlinedInput
                  label="Product name"
                  placeholder="product's name here"
                  OnChangeText={props.handleChange("productName")}
                />
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "50%",
                    }}
                  >
                    <OutlinedInput
                      label="Buying price"
                      placeholder="price here"
                      keyboardType="phone-pad"
                      OnChangeText={props.handleChange("bprice")}
                    />
                  </View>
                  <View style={{ width: sizes[1] }}></View>
                  <View
                    style={{
                      flex: 1,
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <OutlinedInput
                      label="Selling price"
                      placeholder="price here"
                      keyboardType="phone-pad"
                      OnChangeText={props.handleChange("sprice")}
                    />
                  </View>
                </View>
                <OutlinedInput
                  label="Quantity"
                  placeholder="Quantity here"
                  keyboardType="phone-pad"
                  OnChangeText={props.handleChange("quantity")}
                />
                <View style={{ alignItems: "center", marginTop: sizes[1] }}>
                  <Button
                    mode="contained"
                    dark={true}
                    color={colors.deepBlue}
                    style={{ padding: 4 }}
                    onPress={props.handleSubmit}
                  >
                    {" "}
                    <Text style={styles.button}>Create</Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: sizes[4],
    width: sizes[4],
    borderRadius: sizes[4] / 2,
    backgroundColor: colors.sofBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sizes[4],
  },
  button: {
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
  },
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "60%",
    backgroundColor: colors.sofBlue,
    borderTopLeftRadius: sizes[2],
    borderTopRightRadius: sizes[2],
    alignItems: "center",
  },
  title: {
    paddingTop: sizes[2],
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.h4,
  },
});

export default NewProduct;
