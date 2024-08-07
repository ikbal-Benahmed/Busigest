import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard,
} from "react-native";
import { colors } from "../../theme/colors";
import RNPickerDialog from "rn-modal-picker";
import { sizes } from "../../theme/sizes";
import { fontSizes } from "../../theme/fonts";
import OutlinedInput from "../inputs/outlinedInput";
import languages from "../Translation/translation";
import expressions from "../Translation/references";

const betterProductName = (name) => {
  if (name === "No Product Selected") return name;
  else return name.split("||")[0].split("-")[1].trim();
};
const PurchaseCard = ({
  removeCallBack = () => {},
  item,
  handleCommandes,
  products = [],
}) => {
  const [productSelec, setProductSelec] = useState({
    productName: "No Product Selected",
    // state: paiements,
  });

  useEffect(() => {
    handleCommandes(productSelec);
  }, [productSelec]);

  const handleProductSelec = (id, itemIn) => {
    const res = itemIn.name;

    setProductSelec({ productName: res, id: itemIn.id, itemId: item });
    // formikRef.current.setFieldValue("client", id);
  };
  return (
    <View>
      <View
        style={{
          marginTop: sizes[1],
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: colors.success,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.white,
            width: "70%",
            marginBottom: -10,
            paddingRight: 5,
          }}
        >
          <RNPickerDialog
            data={products}
            pickerTitle={"Sort by"}
            // labelText={'testss'}
            showSearchBar={true}
            showPickerTitle={true}
            selectedText={betterProductName(productSelec.productName)}
            pickerStyle={{ margin: -10 }}
            placeHolderText={"Try again"}
            selectedTextStyle={{ color: colors.white }}
            searchBarPlaceHolder={"Search....."}
            searchBarPlaceHolderColor={"#9d9d9d"}
            dropDownIcon={require("../../Icons/dropDown.png")}
            placeHolderTextColor={"white"}
            selectedValue={(index, item) => handleProductSelec(index, item)}
            //dropDownIcon={require('../assets/pin.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => removeCallBack(item)}
          style={{
            marginLeft: sizes[0],
            paddingVertical: sizes[0],
            paddingHorizontal: sizes[0],
            backgroundColor: colors.error,
            marginTop: sizes[1],
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.button,
            }}
          >
            {languages.t(expressions.remove)}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "3%",
          // justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-around",
            gap: Platform.OS == "ios" ? "10%" : 5,
            alignItems: "center",
            width: "90%",
            // backgroundColor: "red",
          }}
        >
          <View style={{ width: "40%" }}>
            <OutlinedInput
              keyboardType="phone-pad"
              OnChangeText={(text) =>
                setProductSelec({ ...productSelec, qte: parseFloat(text) })
              }
              label={languages.t(expressions.quantity)}
            />
          </View>
          <View style={{ width: "53%" }}>
            <OutlinedInput
              keyboardType="phone-pad"
              OnChangeText={(text) =>
                setProductSelec({ ...productSelec, remise: parseFloat(text) })
              }
              label={languages.t(expressions.remise)}
            />
          </View>
        </View>
        {/* <View style={{ marginTop: "3%", width: "20%" }}>
          <STATES state={paiements.UNPAID} size={25} />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PurchaseCard;
