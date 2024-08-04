import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  format_price,
  getCommandes,
  getCurrentDate,
  getDetailsCommandes,
  getProducts,
  getTop3,
  getTotalGain,
  removeDB,
  removeDetailsCommandes,
  removeProducts,
  removePurchase,
  removeTable,
} from "../backend/functions";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import Upperbutton from "../Utils/upperButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { checkDB, exportDB } from "../backend/exportDB";
import { Button } from "react-native-paper";
import languages from "../Utils/Translation/translation";
import expressions from "../Utils/Translation/references";

const Welcome = ({ navigation }) => {
  const [montant, setMontant] = useState();
  const [topProducts, setTopProduct] = useState([]);
  const [startDate, setStartDate] = useState({
    val: new Date("2001-01-01"),
    show: false,
  });
  const [enDate, setEndDate] = useState({
    val: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    show: false,
  });
  const onChange = (event, selectedDate, type) => {
    if (selectedDate) {
      // const currentDate = getCurrentDate(selectedDate);
      if (type === "start") {
        setStartDate({ val: selectedDate, show: false });
      } else {
        setEndDate({ val: selectedDate, show: false });
      }
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log(startDate.val);
    console.log(enDate.val);
    console.log("====================================");
    getTotalGain(fetchMontant);
    getTop3(startDate.val, enDate.val, fetchTopProds);
    // getTop3(fetchTopProds);
    const unsubscribe = navigation.addListener("focus", () => {
      getTotalGain(fetchMontant);
      getTop3(startDate.val, enDate.val, fetchTopProds);
    });
    return unsubscribe;
  }, [navigation, enDate.val, startDate.val]);

  const fetchMontant = (res) => {
    setMontant(res[0].RESULT);
  };
  const fetchTopProds = (res) => {
    console.log("===================TOP 3=================");
    console.log(res);
    console.log("====================================");
    const list = [];
    let taille;
    res.length >= 3 ? (taille = 3) : (taille = res.length);
    for (let i = 0; i < taille; i++) {
      list.push(res[i].PRODNAME);
    }
    setTopProduct(list);
  };
  const renderProds = topProducts.map((prod) => {
    return (
      <Text style={styles.items} key={prod}>
        {prod}
      </Text>
    );
  });
  // getCommandes();
  // getDetailsCommandes();
  // removeTable();
  // removeProducts();
  // removePurchase();
  // removeDetailsCommandes();
  return (
    <View style={{ flex: 1, backgroundColor: colors.deepBlue }}>
      <View style={{ paddingTop: sizes[3], paddingHorizontal: "10%" }}>
        <Upperbutton
          text={languages.t(expressions.my_clients)}
          icon={"people"}
          tl={sizes[1]}
          tr={sizes[1]}
          bl={sizes[0]}
          br={sizes[0]}
          onPress={() => {
            setMontant();
            setTopProduct([]);
            navigation.navigate("MyClients");
          }}
        />
        <Upperbutton
          text={languages.t(expressions.my_products)}
          icon={"albums"}
          tl={sizes[1]}
          tr={sizes[1]}
          bl={sizes[1]}
          br={sizes[1]}
          onPress={() => {
            navigation.navigate("MyProducts");
            setMontant();
            setTopProduct([]);
          }}
        />
        <Upperbutton
          text={languages.t(expressions.my_sellings)}
          icon={"card"}
          tl={sizes[0]}
          tr={sizes[0]}
          bl={sizes[1]}
          br={sizes[1]}
          onPress={() => {
            setMontant();
            setTopProduct([]);

            navigation.navigate("MyPurchases");
          }}
        />
      </View>
      <View style={styles.vue}>
        <Text style={styles.title}>{languages.t(expressions.total_gain)}</Text>
        <Text style={styles.montant}>
          {format_price(montant)}{" "}
          <Text
            style={{ fontSize: fontSizes.h5_1, fontFamily: fonts.robotoThin }}
          >
            {languages.t(expressions.da)}
          </Text>
        </Text>
        <View
          style={{
            backgroundColor: colors.white,
            height: "0.2%",
            width: "70%",
            marginTop: sizes[1],
          }}
        />
        <Text style={[styles.title, { marginTop: sizes[0] }]}>
          {languages.t(expressions.top_3_products)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: "5%",
          }}
        >
          {startDate.show && (
            <DateTimePicker
              minimumDate={new Date(2000, 1, 1)}
              maximumDate={new Date(2099, 12, 31)}
              testID="dateTimePicker"
              value={startDate.val}
              mode={"date"}
              is24Hour={true}
              onChange={(event, value) => onChange(event, value, "start")}
            />
          )}
          <View>
            <Text style={{ color: "white", fontFamily: fonts.robotoThin }}>
              {languages.t(expressions.from)}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.robotoThin,
                fontSize: fontSizes.body,
              }}
              onPress={() => setStartDate({ ...startDate, show: true })}
            >
              {getCurrentDate(startDate.val)}
            </Text>
          </View>
          <View>{renderProds}</View>

          {enDate.show && (
            <DateTimePicker
              minimumDate={new Date(2000, 1, 1)}
              maximumDate={new Date(2099, 12, 31)}
              testID="dateTimePicker"
              value={enDate.val}
              mode={"date"}
              is24Hour={true}
              onChange={(event, value) => onChange(event, value, "end")}
            />
          )}
          <View>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.robotoThin,
                textAlign: "right",
              }}
            >
              {languages.t(expressions.to)}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: fonts.robotoThin,
                fontSize: fontSizes.body,
              }}
              onPress={() => setEndDate({ ...enDate, show: true })}
            >
              {getCurrentDate(enDate.val)}
            </Text>
          </View>
        </View>
        {/* </Text> */}
        <View
          style={{ position: "absolute", bottom: "5%", alignSelf: "center" }}
        >
          <Button
            style={{ backgroundColor: colors.darkBlue, borderRadius: 10 }}
            onPress={async () => {
              // getDetailsCommandes();
              // getTop3();
              // await writeQuery(`DELETE FROM DETAILCOMMANDE WHERE IDCOMM = 5`, db);
              // await writeQuery(`DELETE FROM COMMANDE WHERE IDCOMM = 5`, db);
              // getCommandes();
              // removeDB();
              // writeQuery("DROP TABLE IF EXISTS DETAILCOMMANDE", db);
              // writeQuery("DROP TABLE IF EXISTS COMMANDE", db);
              // addClient("bibel", "0540693123", "Bordj Bou Arreridj");
              // addProduct("P1", 100, 200, 100);
              // getCommandeWithTurnover();
              await exportDB();
              // removeDB();
              // await checkDB();
            }}
          >
            <Text style={{ color: colors.white }}>
              {languages.t(expressions.save_db)}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vue: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "40%",
    backgroundColor: colors.sofBlue,
    borderTopLeftRadius: sizes[2],
    borderTopRightRadius: sizes[2],
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontFamily: fonts.robotoThin,
    fontSize: fontSizes.h51,
    textAlign: "center",
  },
  montant: {
    color: colors.white,
    fontSize: fontSizes.h4,
    fontFamily: fonts.robotoBold,
    textAlign: "center",
  },
  items: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.title,
    fontFamily: fonts.robotoLight,
    paddingTop: sizes[0],
  },
});

export default Welcome;
