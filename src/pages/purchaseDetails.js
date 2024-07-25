import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import { Button } from "react-native-paper";
import {
  format_price,
  getCommande_Gain,
  removePurchaseFromId,
} from "../backend/functions";

const PurchaseDetails = ({
  DATECOMM = "Test Test Test",
  IDCLIENT = 0,
  IDCOMM = 1,
  clientName = 2000,
  TOTAL = 3000,
  products = [],
  navigation,
  route,
}) => {
  ({ DATECOMM, IDCLIENT, IDCOMM, TOTAL, products, clientName } =
    route.params.item);
  const [gain, setGain] = useState(0);
  useEffect(() => {
    getCommande_Gain(IDCOMM, setGain);
  }, []);
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Deleting purchase",
      `Are you sure you want to delete this purchase from your list ?`,
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            removePurchaseFromId(IDCOMM);
            setTimeout(() => {
              navigation.navigate("MyPurchases");
            }, 1000);
          },
        },
      ]
    );

  const purchaseProds = products.map((product) => {
    return (
      <Text style={styles.subTitle} key={product.PRODNAME}>
        {product.PRODNAME +
          "\t\tQuantity : " +
          product.QUANTITY +
          " Pcs" +
          "\t\tRemise : " +
          format_price(product.REMISE) +
          " Da"}
      </Text>
    );
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.deepBlue,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: fonts.robotoBold,
            color: colors.white,
            fontSize: fontSizes.h4,
          }}
        >
          Purchase details
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
            {DATECOMM}
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
              marginLeft: sizes[0],
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={styles.title}>Client</Text>
              <Text
                style={[
                  styles.subTitle,
                  {
                    color: clientName === null ? colors.error : colors.deepBlue,
                  },
                ]}
              >
                {clientName === null ? "[DELETED]" : clientName}
              </Text>
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
                style={{ fontSize: fontSizes.title, color: colors.darkBlue }}
              >
                Products
              </Text>
              {products.length === 0 ? (
                <Text style={{ color: colors.error }}>[DELETED]</Text>
              ) : (
                purchaseProds
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: sizes[3],
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "baseline",
              gap: Platform.OS == "ios" ? "5%" : 5,
            }}
          >
            <Text style={styles.title}>Total:</Text>
            <View>
              <Text style={styles.subTitle}>
                {format_price(TOTAL, false) + " Da"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "baseline",
              gap: Platform.OS == "ios" ? "5%" : 5,
            }}
          >
            <Text style={[styles.title, { color: colors.success }]}>Gain:</Text>
            <View>
              <Text style={styles.subTitle}>
                {gain ? format_price(gain[0].RESULT, false) + " Da" : "0 Da"}
              </Text>
            </View>
          </View>
        </View>
        <Button
          style={{ paddingTop: sizes[1] }}
          color={colors.error}
          onPress={() => createTwoButtonAlert()}
        >
          <Text style={styles.buttonContent}>Remove purchase</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: fontSizes.h5_1,
    textAlign: "left",
    marginTop: sizes[0],
  },
  buttonContent: {
    fontSize: fontSizes.title,
    color: colors.error,
  },
});

export default PurchaseDetails;
