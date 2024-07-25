import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpaCITY, Alert } from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  format_price,
  getClientTurnover,
  removeClient,
  updatePhone,
} from "../backend/functions";
import OutlinedInput from "../Utils/inputs/outlinedInput";
import { wilayas } from "./wilayas";
import Person from "../Icons/Person";

const ClientDetails = ({
  NAME = "Test Test Test",
  id = 1,
  PHONE = "0540995962",
  CITY = 54,
  total = 5000,
  navigation,
  route,
}) => {
  route.params ? ({ NAME, CITY, id, PHONE } = route.params.item) : null;

  const [phone, setPhone] = useState(PHONE);
  const [finalPhone, setFinalPhone] = useState(PHONE);
  const [turnover, setTurnover] = useState(0);
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Deleting " + NAME + "",
      `Are you sure you want to delete ${NAME} from your clients ?`,
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            removeClient(id);
            navigation.goBack();
          },
        },
      ]
    );
  useEffect(() => {
    // getDetailsCommandes();
    getClientTurnover(id, fetchTunover);
  }, []);
  const fetchTunover = (res) => {
    console.log("====================================");
    console.log(res);
    console.log("====================================");
    setTurnover(res[0].RESULT);
  };
  console.log(typeof CITY);
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
          Client details
        </Text>
        <View
          style={{
            marginVertical: sizes[0],
            height: 1,
            backgroundColor: "white",
            width: "85%",
            alignSelf: "center",
          }}
        ></View>
      </View>
      <View style={[styles.circle, { alignSelf: "center" }]}>
        <Person />
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
            {NAME}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: sizes[1],
          }}
        >
          <View
            style={{
              marginLeft: sizes[0],
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: sizes[1],
                }}
              >
                <View style={{ marginRight: sizes[0] }}>
                  <Ionicons
                    color={colors.darkBlue}
                    name="call"
                    size={fontSizes.button}
                  />
                </View>
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontFamily: fonts.OpenSans_700Bold,
                    fontSize: fontSizes.title,
                  }}
                >
                  Phone number
                </Text>
              </View>
              <Text style={[styles.subTitle, { marginLeft: sizes[1] }]}>
                {finalPhone}
              </Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: sizes[1] }}>
              <View
                style={{
                  flexDirection: "row",
                  width: "60%",
                }}
              >
                <OutlinedInput
                  value={phone}
                  backColor={colors.white}
                  label="Change phone number"
                  placeholder="Change number here"
                  keyboardType="phone-pad"
                  textColor={colors.deepBlue}
                  OnChangeText={(text) => {
                    setPhone(text);
                  }}
                />
              </View>
              <View
                style={{
                  width: "60%",
                }}
              >
                <Button
                  mode="contained"
                  dark={true}
                  color={colors.deepBlue}
                  onPress={() => {
                    if (
                      (phone.slice(0, 2) === "05" ||
                        phone.slice(0, 2) === "07" ||
                        phone.slice(0, 2) === "06") &&
                      phone.length === 10
                    ) {
                      setFinalPhone(phone);
                      updatePhone(id, phone);
                    } else {
                      alert("Please, enter a valid phone number");
                    }

                    setPhone("");
                  }}
                >
                  <Text style={styles.button}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          ></View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: sizes[1],
                }}
              >
                <View style={{ marginRight: sizes[0] }}>
                  <Ionicons
                    color={colors.darkBlue}
                    name="location"
                    size={fontSizes.button}
                  />
                </View>
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontFamily: fonts.OpenSans_700Bold,
                    fontSize: fontSizes.title,
                  }}
                >
                  CITY
                </Text>
              </View>
              <Text style={[styles.subTitle, { marginLeft: sizes[1] }]}>
                {wilayas[CITY]}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          ></View>
        </View>
        <View style={{ marginTop: sizes[3] }}>
          <Text style={styles.title}>Client's tunover</Text>
          <View>
            <Text style={styles.subTitle}>
              {turnover
                ? format_price(turnover) + " Da"
                : "Client never bought"}
            </Text>
            <Button
              style={{ paddingTop: sizes[1] }}
              color={colors.error}
              onPress={() => createTwoButtonAlert()}
            >
              <Text style={styles.buttonContent}>Remove client</Text>
            </Button>
          </View>
        </View>
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
  buttonContent: {
    fontSize: fontSizes.title,
    color: colors.error,
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
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "70%",
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

export default ClientDetails;
