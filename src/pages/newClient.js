import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, Keyboard } from "react-native";
import { colors } from "../theme/colors";
import { sizes } from "../theme/sizes";
import Person from "../Icons/Person";
import { fonts, fontSizes } from "../theme/fonts";
import { Formik } from "formik";
import OutlinedInput from "../Utils/inputs/outlinedInput";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { addClient, removeTable } from "../backend/functions";
import { TouchableWithoutFeedback } from "react-native";
import languages from "../Utils/Translation/translation";
import expressions from "../Utils/Translation/references";
const NewClient = ({ navigation }) => {
  // ...
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // ...
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        onPress={Keyboard.dismiss}
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.deepBlue,
        }}
      >
        <View style={styles.circle}>
          <Person />
        </View>
        <View style={styles.vue}>
          <Text style={styles.title}>
            {languages.t(expressions.new_client)}
          </Text>
          <Formik
            initialValues={{ name: "", phoneN: "", city: "" }}
            onSubmit={(values) => {
              if (
                values.name.trim() === "" ||
                values.phoneN.trim() === "" ||
                values.city === ""
              ) {
                alert("Please fill all information");
              } else {
                addClient(
                  values.name.trim(),
                  values.phoneN.trim(),
                  values.city
                );
                setTimeout(() => {
                  navigation.navigate("MyClients");
                }, 1000);
              }
            }}
          >
            {(props) => (
              <View style={{ flex: 1, width: "90%" }}>
                <OutlinedInput
                  label={languages.t(expressions.name)}
                  OnChangeText={props.handleChange("name")}
                  handleBlur={props.handleBlur("name")}
                />
                <OutlinedInput
                  OnChangeText={props.handleChange("phoneN")}
                  handleBlur={props.handleBlur("phoneN")}
                  label={languages.t(expressions.phone_number)}
                  keyboardType="phone-pad"
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.white,
                    marginTop: sizes[1],
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: fontSizes.title,
                      paddingStart: sizes[1],
                      justifyContent: "flex-start",
                    }}
                  >
                    {languages.t(expressions.city)}
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      paddingStart: sizes[2],
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Picker
                      onValueChange={props.handleChange("city")}
                      mode="dropdown"
                      style={{
                        height: 50,
                        width: "50%",
                        color: colors.white,
                      }}
                      selectedValue={props.values.city}
                    >
                      <Picker.Item
                        label={languages.t(expressions.select_a_city)}
                        value=""
                      />
                      <Picker.Item label="01 - Adrar" value="01" />
                      <Picker.Item label="02 - Chlef" value="02" />
                      <Picker.Item label="03 - Laghouat" value="03" />
                      <Picker.Item label="04 - Oum-El-Bouaghi" value="04" />
                      <Picker.Item label="05 - Batna" value="05" />
                      <Picker.Item label="06 - Béjaïa" value="06" />
                      <Picker.Item label="07 - Biskra" value="07" />
                      <Picker.Item label="08 - Béchar" value="08" />
                      <Picker.Item label="09 - Blida" value="09" />
                      <Picker.Item label="10 - Bouira" value="10" />
                      <Picker.Item label="11 - Tamanrasset" value="11" />
                      <Picker.Item label="12 - Tébessa" value="12" />
                      <Picker.Item label="13 - Tlemcen" value="13" />
                      <Picker.Item label="14 - Tiaret" value="14" />
                      <Picker.Item label="15 - Tizi-Ouzou" value="15" />
                      <Picker.Item label="16 - Alger" value="16" />
                      <Picker.Item label="17 - Djelfa" value="17" />
                      <Picker.Item label="18 - Jijel" value="18" />
                      <Picker.Item label="19 - Sétif" value="19" />
                      <Picker.Item label="20 - Saïda" value="20" />
                      <Picker.Item label="21 - Skikda" value="21" />
                      <Picker.Item label="22 - Sidi Bel Abbès" value="22" />
                      <Picker.Item label="23 - Annaba" value="23" />
                      <Picker.Item label="24 - Guelma" value="24" />
                      <Picker.Item label="25 - Constantine" value="25" />
                      <Picker.Item label="26 - Médéa" value="26" />
                      <Picker.Item label="27 - Mostaganem" value="27" />
                      <Picker.Item label="28 - M’sila" value="28" />
                      <Picker.Item label="29 - Mascara" value="29" />
                      <Picker.Item label="30 - Ouargla" value="30" />
                      <Picker.Item label="31 - Oran" value="31" />
                      <Picker.Item label="32 - El Bayadh" value="32" />
                      <Picker.Item label="33 - Illizi" value="33" />
                      <Picker.Item label="34 - Bordj Bou Arreridj" value="34" />
                      <Picker.Item label="35 - Boumerdès" value="35" />
                      <Picker.Item label="36 - El-Tarf" value="36" />
                      <Picker.Item label="37 - Tindouf" value="37" />
                      <Picker.Item label="38 - Tissemsilt" value="38" />
                      <Picker.Item label="39 - El-Oued" value="39" />
                      <Picker.Item label="40 - Khenchela" value="40" />
                      <Picker.Item label="41 - Souk-Ahras" value="41" />
                      <Picker.Item label="42 - Tipaza" value="42" />
                      <Picker.Item label="43 - Mila" value="43" />
                      <Picker.Item label="44 - Aïn-Defla" value="44" />
                      <Picker.Item label="45 - Naâma" value="45" />
                      <Picker.Item label="46 - Aïn-Témouchent" value="46" />
                      <Picker.Item label="47 - Ghardaïa" value="47" />
                      <Picker.Item label="48 - Relizane" value="48" />
                      <Picker.Item label="49 - El M'Ghair" value="49" />
                      <Picker.Item label="50 - El Meniaa" value="50" />
                      <Picker.Item label="51 - Ouled Djellal" value="51" />
                      <Picker.Item
                        label="52 - Bordj Badji Mokhtar"
                        value="52"
                      />
                      <Picker.Item label="53 - Béni Abbès" value="53" />
                      <Picker.Item label="54 - Timimoun" value="54" />
                      <Picker.Item label="55 - Touggourt" value="55" />
                      <Picker.Item label="56 - Djanet" value="56" />
                      <Picker.Item label="57 - In Salah" value="57" />
                      <Picker.Item label="58 - In Guezzam" value="58" />
                    </Picker>
                  </View>
                </View>
                <View style={{ alignItems: "center", marginTop: sizes[1] }}>
                  <Button
                    mode="contained"
                    dark={true}
                    color={colors.deepBlue}
                    style={{ padding: 4 }}
                    onPress={props.handleSubmit}
                  >
                    {" "}
                    <Text style={styles.button}>
                      {languages.t(expressions.create)}
                    </Text>
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
    marginTop: sizes[4],
  },
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "78%",
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
  button: {
    color: colors.white,
    fontFamily: fonts.OpenSans_700Bold,
    fontSize: fontSizes.title,
  },
});

export default NewClient;
