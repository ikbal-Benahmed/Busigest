import React, { useEffect, useState } from "react";
import { Keyboard, Platform, Text } from "react-native";
import { FlatList } from "react-native";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import { Searchbar } from "react-native-paper";
import {
  format_price,
  get_state_amount,
  getCommandeWithTurnover,
} from "../backend/functions";
import LastButton from "../Utils/LastButton";
import CommandeCard from "../Utils/cards/CommandeCard";
import { wilayas } from "./wilayas";
import { sansAccent } from "./sansAccent";
import STATES from "../Utils/states";
import paiements from "../Utils/paiements";
import { TouchableWithoutFeedback } from "react-native";

const MyPurchases = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState([]);
  const [gain, setGain] = useState([]);
  const [renderState, setRenderState] = useState(false);
  const [state_total, setTotalState] = useState({
    UNPAID: 0,
    PAID: 0,
    DELIVERED: 0,
    CANCELED: 0,
    REFUNDED: 0,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getCommandeWithTurnover(fetchCommandes);
      const load_states = async () => {
        const states = {};
        await get_state_amount(paiements.PAID, (val) => {
          states.PAID = val[0].RESULT;
        });
        await get_state_amount(
          paiements.UNPAID,
          (val) => (states.UNPAID = val[0].RESULT)
        );
        await get_state_amount(
          paiements.DELIVERY,
          (val) => (states.DELIVERED = val[0].RESULT)
        );
        await get_state_amount(
          paiements.CANCELED,
          (val) => (states.CANCELED = val[0].RESULT)
        );
        await get_state_amount(
          paiements.REFUNDED,
          (val) => (states.REFUNDED = val[0].RESULT)
        );

        setTotalState(states);
      };
      load_states();
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const load_states = async () => {
      const states = {};
      await get_state_amount(paiements.PAID, (val) => {
        states.PAID = val[0].RESULT;
      });
      await get_state_amount(
        paiements.UNPAID,
        (val) => (states.UNPAID = val[0].RESULT)
      );
      await get_state_amount(
        paiements.DELIVERY,
        (val) => (states.DELIVERED = val[0].RESULT)
      );
      await get_state_amount(
        paiements.CANCELED,
        (val) => (states.CANCELED = val[0].RESULT)
      );
      await get_state_amount(
        paiements.REFUNDED,
        (val) => (states.REFUNDED = val[0].RESULT)
      );
      console.log(states);
      setTotalState(states);
      console.log("HEERE");
    };
    load_states();
  }, [renderState]);

  const fetchCommandes = (res) => {
    setResults(res);
    fetchTotal(res);
    fetchGain(res);
  };
  const fetchTotal = (list) => {
    const totalS = list.reduce(function (acc, obj) {
      return acc + obj.TOTAL;
    }, 0);
    setTotal(totalS);
  };
  const fetchGain = (list) => {
    const totalS = list.reduce(function (acc, obj) {
      return acc + obj.TOTAL;
    }, 0);
    const totalB = list.reduce(function (acc, obj) {
      return acc + obj.TOTALB;
    }, 0);
    setGain(totalS - totalB);
  };
  const updateResults = (products, id) => {
    let myRes = results;
    let index = myRes.findIndex((o) => o.IDCOMM === id);

    myRes[index].products = products;
    setResults(myRes);
  };
  const onChangeSearch = (query) => {
    const newRes = results.filter((item) => {
      console.log("=======================ITEEEM=============");
      console.log(item);
      console.log("====================================");
      if (
        item.DATECOMM.toLowerCase().includes(query.toLowerCase().trim()) ||
        item.clientName?.toLowerCase().includes(query.toLowerCase().trim()) ||
        checkIfInList(query, item.products) ||
        sansAccent(wilayas[item.CITY]).toLowerCase() ===
          query.toLowerCase().trim() ||
        wilayas[item.CITY]?.toLowerCase() === query.toLowerCase().trim()
      ) {
        return item;
      }
    });
    if (newRes.length === 0 && query.length > 0) newRes[0] = "null";
    setSearchQuery(newRes);
    if (newRes.length > 0 && newRes[0] === "null") {
      setTotal(0);
      setGain(0);
    } else if (newRes.length > 0) {
      fetchTotal(newRes);
      fetchGain(newRes);
    }
  };
  const checkIfInList = (text, list) => {
    let res = false;
    list.forEach((o) => {
      if (o.PRODNAME.toLowerCase().includes(text.toLowerCase())) res = true;
    });
    return res;
  };
  let mydata;

  if (searchQuery.length === 0) {
    mydata = results;
  } else if (searchQuery.length > 0 && searchQuery[0] === "null") mydata = [];
  else mydata = searchQuery;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            My Sellings
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
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginBottom: sizes[1],
            }}
          >
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} />
          </View>
        </View>
        <FlatList
          data={mydata}
          renderItem={({ item }) => {
            return (
              <CommandeCard
                item={item}
                DATECOMM={item.DATECOMM}
                CLIENT={item.IDCLIENT}
                CLIENTNAME={item.clientName}
                TOTAL={item.TOTAL}
                IDCOMM={item.IDCOMM}
                callback={updateResults}
                onPress={() => navigation.navigate("PurchaseDetails", { item })}
                parentCallback={(value) => {
                  setRenderState(!renderState);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.IDCOMM}
          contentContainerStyle={{ padding: 4 }}
        />
        <View
          style={{
            backgroundColor: colors.white,
            paddingTop: "2%",
            borderTopLeftRadius: Platform.OS == "ios" ? "15%" : 20,
            borderTopRightRadius: Platform.OS == "ios" ? "15%" : 20,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: "3%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <STATES
                state={paiements.PAID}
                size={18}
                total={state_total.PAID}
              />
              <STATES
                state={paiements.UNPAID}
                size={18}
                total={state_total.UNPAID}
              />
              <STATES
                state={paiements.DELIVERY}
                size={18}
                total={state_total.DELIVERED}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-around",
              }}
            >
              <STATES
                state={paiements.CANCELED}
                size={18}
                total={state_total.CANCELED}
              />
              <STATES
                state={paiements.REFUNDED}
                size={18}
                total={state_total.REFUNDED}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "98%",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={[styles.total, { fontSize: fontSizes.title }]}>
                Total Turnover
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  // justifyContent: "flex-start",
                }}
              >
                <Text style={styles.total}>
                  {total ? format_price(total) : 0}{" "}
                  <Text style={[styles.total, { fontSize: fontSizes.h5 }]}>
                    Da
                  </Text>
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.gain,
                  { fontSize: fontSizes.title, textAlign: "right" },
                ]}
              >
                Total Gain
              </Text>

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={styles.gain}>
                  {gain ? format_price(gain) : 0}{" "}
                  <Text style={[styles.gain, { fontSize: fontSizes.h5 }]}>
                    Da
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <LastButton
          title="New Purchase"
          onPress={() => navigation.navigate("NewPurchase")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gain: {
    fontSize: fontSizes.h4,
    color: colors.success,
    fontFamily: fonts.robotoBold,
    fontSize: fontSizes.h4,
    color: colors.success,
    fontFamily: fonts.robotoBold,
  },
  total: {
    fontSize: fontSizes.h4,
    color: colors.darkBlue,
    fontFamily: fonts.robotoBold,
  },
});

export default MyPurchases;
