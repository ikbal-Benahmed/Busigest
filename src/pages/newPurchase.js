import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../theme/colors";
import { sizes } from "../theme/sizes";
import { fonts, fontSizes } from "../theme/fonts";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import {
  addPurchase,
  getClients,
  getCurrentDate,
  getProducts,
} from "../backend/functions";
import Product from "../Icons/Product";
import { Ionicons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerDialog from "rn-modal-picker";
import PurchaseCard from "../Utils/cards/PurchaseCard";
import { TouchableWithoutFeedback } from "react-native";
const NewPurchase = ({ navigation }) => {
  const formikRef = useRef();
  const [date, setDate] = useState(getCurrentDate());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState([]);
  const [productChoice, setProductChoice] = useState([]);
  const [clientSelec, setClientSelec] = useState("No client selected");
  const [products, setProducts] = useState([]);
  const [productsCopy, setProductsCopy] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    getClients(fetchClients);
    getProducts(fetchProducts);
  }, []);
  const getDate = (date) => {
    const newDate = date.split("/");
    const result = newDate[1] + "/" + newDate[0] + "/20" + newDate[2];
    return result;
  };
  const fetchProducts = (res) => {
    const myData = res;
    const final = [];
    myData.forEach((item) => {
      if (item.QTE > 0)
        final.push({
          id: item.IDPRODUCT,
          name:
            item.IDPRODUCT +
            " - " +
            item.PRODNAME +
            " || QTE : " +
            item.QTE +
            " || Selling Price : " +
            item.SPRICE +
            " Da",
        });
    });
    setProductsCopy(final);
    setProducts(final);
  };

  const removeCallBack = (item) => {
    const prod = productChoice;
    let i = 0;
    const res = [];

    let j = 0;
    while (i < prod.length) {
      if (prod[i] !== item) {
        res[j] = prod[i];
        j++;
      }
      i++;
    }
    const commandes = formikRef.current.values.commandes;
    i = 0;
    j = 0;
    const commRes = [];
    let productId;
    while (i < commandes.length) {
      if (commandes[i].itemId !== item) {
        commRes[j] = commandes[i];
        j++;
      } else {
        productId = commandes[i].id;
      }
      i++;
    }
    formikRef.current.setFieldValue("commandes", [...commRes]);
    productsCopy.forEach((element) => {
      if (element.id === productId) {
        setProducts([...products, element].sort((a, b) => a.name - b.name));
      }
    });
    setProductChoice(res);
  };
  const removeProductWhenSelected = (id) => {
    const prods = [];

    let x = 0;
    let j = 0;
    while (x < products.length) {
      if (products[x].id !== id) {
        prods[j] = products[x];
        j++;
      }
      x++;
    }
    setProducts(prods);
  };
  const handleCommandes = (commande) => {
    if (commande.id) {
      const commandes = formikRef.current.values.commandes;
      let index = -1;
      for (let i = 0; i < commandes.length; i++) {
        if (commandes[i].itemId === commande.itemId) {
          index = i;
        }
      }
      if (index !== -1) {
        commandes[index] = commande;
        formikRef.current.setFieldValue("commandes", [...commandes]);
      } else {
        formikRef.current.setFieldValue("commandes", [...commandes, commande]);
        removeProductWhenSelected(commande.id);
      }
    }
  };
  const checkQuantity = (commandes) => {
    let bool = false;
    commandes.forEach((element) => {
      if (element.qte) {
        if (element.qte === 0) bool = true;
      } else bool = true;
    });
    return bool;
  };

  const fetchClients = (res) => {
    const myData = res;
    const final = [];
    myData.forEach((item) => {
      final.push({ id: item.id, name: item.id + " " + item.NAME });
    });
    setClients(final);
  };
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      console.log("============== oNcHNGE DATE ======================");
      console.log(getCurrentDate(currentDate));
      setShow(false);
      formikRef.current.setFieldValue("date", currentDate);
      setDate(getCurrentDate(currentDate));
    }
    setShow(false);
  };
  const handleClientSelec = (id, item) => {
    setClientSelec(item.name.split(" ").slice(1).join(" ").toString().trim());
    formikRef.current.setFieldValue("client", id);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const getQuantityFromProductName = (name) => {
    if (name) {
      const final = name.split("QTE :")[1];
      const res = parseInt(final);
      return res;
    } else {
      return null;
    }
  };
  const getSpriceFromProductName = (name) => {
    if (name) {
      const final = name.split("Selling price :")[1] - " Da";
      let qte = name.split("QTE :")[1].split(" ")[0];
      const res = parseFloat(final);
      qte = parseInt(qte);
      return res * qte;
    } else {
      return null;
    }
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.deepBlue,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.circle}>
          <Product />
        </View>
        <View style={styles.vue}>
          <Text style={styles.title}>New purchase</Text>
          <Formik
            innerRef={formikRef}
            initialValues={{
              date: new Date(),
              client: "",
              commandes: [],
            }}
            onSubmit={(values) => {
              if (values.client === "" || values.commandes.length === 0) {
                alert("Please chose the client and add products");
              } else {
                const res = values.commandes;

                if (res[0].id === undefined) {
                  res.shift();
                }
                if (checkQuantity(res)) alert("Please add a quantity");
                else {
                  let bool = false;
                  res.forEach((item) => {
                    if (
                      item.qte > getQuantityFromProductName(item.productName)
                    ) {
                      bool = true;
                      alert(
                        "Quantity of " +
                          item.productName.split("||")[0].split("-")[1].trim() +
                          " must be less than " +
                          getQuantityFromProductName(item.productName)
                      );
                    }
                    if (
                      item.remise > getSpriceFromProductName(item.productName)
                    ) {
                      bool = true;
                      alert(
                        "Remise of " +
                          item.productName.split("||")[0].split("-")[1].trim() +
                          " must be less than " +
                          getSpriceFromProductName(item.productName)
                      );
                    }
                  });

                  if (!bool) {
                    console.log("==============DATE ======================");
                    console.log(values.date);
                    console.log("====================================");
                    addPurchase(
                      getCurrentDate(values.date),
                      values.client,
                      res
                    );
                    setProductChoice([]);
                    setClientSelec("No client selected");
                    setTimeout(() => {
                      navigation.navigate("MyPurchases");
                    }, 1000);
                    formikRef.current.setFieldValue("client", "");
                    formikRef.current.setFieldValue("commandes", []);
                  }
                }
              }
              // getDetailsCommandes();
              // getClients();
              // getCommandes();
              // removePurchase();
              getProducts();
              // removeDetailsCommandes();
              // getTotalSpending(0);
            }}
          >
            {(props) => (
              <View style={{ flex: 1, width: "90%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      paddingHorizontal: sizes[0],
                      paddingVertical: sizes[1],
                      borderColor: colors.white,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: fontSizes.button + 2,
                      }}
                    >
                      Selected : {date}
                    </Text>
                  </View>
                  {show && (
                    <DateTimePicker
                      minimumDate={new Date(2000, 1, 1)}
                      maximumDate={new Date(2099, 12, 31)}
                      testID="dateTimePicker"
                      value={props.values.date}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}

                  <View
                    style={{
                      marginLeft: sizes[1],
                    }}
                  >
                    <Button
                      mode="contained"
                      color={colors.deepBlue}
                      onPress={showDatepicker}
                    >
                      Change Date
                    </Button>
                  </View>
                </View>
                {clients.length > 0 ? (
                  <View
                    style={{
                      marginTop: sizes[1],
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: colors.white,
                    }}
                  >
                    <RNPickerDialog
                      data={clients}
                      pickerTitle={"Clients"}
                      showSearchBar={true}
                      showPickerTitle={true}
                      selectedText={clientSelec}
                      pickerStyle={{ margin: -10 }}
                      placeHolderText={"Try again"}
                      selectedTextStyle={{ color: colors.white }}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      dropDownIcon={require("../Icons/dropDown.png")}
                      placeHolderTextColor={"white"}
                      selectedValue={(index, item) =>
                        handleClientSelec(item.id, item)
                      }
                    />
                  </View>
                ) : null}

                <FlatList
                  data={productChoice}
                  removeClippedSubviews={false}
                  renderItem={({ item }) => {
                    return (
                      <PurchaseCard
                        removeCallBack={removeCallBack}
                        item={item}
                        products={products}
                        handleCommandes={handleCommandes}
                      />
                    );
                  }}
                  keyExtractor={(item) => item}
                  contentContainerStyle={{ padding: 4 }}
                />

                {!keyboardVisible && (
                  <View>
                    <View style={{ alignItems: "center", marginTop: sizes[1] }}>
                      <Text style={styles.button}>Add product</Text>
                      <TouchableOpacity
                        style={{
                          height: sizes[2] + 10,
                          width: sizes[2] + 10,
                          borderRadius: sizes[2] + 10 / 2,
                          bordercolor: colors.white,
                          backgroundColor: colors.white,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: sizes[0],
                        }}
                        onPress={() => {
                          if (productChoice.length === 0) setProductChoice([1]);
                          else
                            setProductChoice([
                              ...productChoice,
                              productChoice[productChoice.length - 1] + 1,
                            ]);
                        }}
                      >
                        <Ionicons
                          name={"add"}
                          color={colors.deepBlue}
                          size={sizes[2] + 10}
                        ></Ionicons>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: sizes[1],
                        marginBottom: sizes[1],
                      }}
                    >
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
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: colors.sofBlue,
    borderColor: colors.white,
    borderWidth: 1,
    color: colors.white,
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
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "87%",
    backgroundColor: colors.sofBlue,
    borderTopLeftRadius: sizes[2],
    borderTopRightRadius: sizes[2],
    alignItems: "center",
  },
  title: {
    paddingTop: sizes[1],
    paddingBottom: sizes[1],
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.h4,
  },
  button: {
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
  },
});

export default NewPurchase;
