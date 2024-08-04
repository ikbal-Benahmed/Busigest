import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import { Searchbar } from "react-native-paper";
import Productcard from "../Utils/cards/productCard";
import {
  format_price,
  getProducts,
  total_product_gain,
  total_stock_value,
} from "../backend/functions";
import LastButton from "../Utils/LastButton";
import languages from "../Utils/Translation/translation";
import expressions from "../Utils/Translation/references";

const MyProducts = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [stock_value, setStock_value] = useState(0);
  const [gain, setGain] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProducts(fetchProducts);
      total_stock_value(setStock_value);
      total_product_gain(setGain);
    });
    return unsubscribe;
  }, [navigation]);

  const fetchProducts = (res) => {
    setResults(res);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

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
          {languages.t(expressions.my_products)}
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
          style={{ width: "90%", alignSelf: "center", marginBottom: sizes[1] }}
        >
          <Searchbar
            placeholder={languages.t(expressions.search)}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      </View>
      <FlatList
        data={
          results
            ? results.filter((item) => {
                if (
                  item.PRODNAME.toLowerCase().includes(
                    searchQuery.toLowerCase()
                  ) ||
                  item.DATE.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return item;
                }
              })
            : results
        }
        renderItem={({ item }) => {
          return (
            <Productcard
              name={item.PRODNAME}
              bprice={item.BPRICE}
              sPrice={item.SPRICE}
              quantity={item.QTE}
              onPress={() => {
                console.log("CLICKED");
                navigation.navigate("ProductDetails", { item });
              }}
            />
          );
        }}
        keyExtractor={(item) => item.IDPRODUCT}
        contentContainerStyle={{ padding: 4 }}
      />
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
            {languages.t(expressions.total_stock)}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              // justifyContent: "flex-start",
            }}
          >
            <Text style={styles.total}>
              {stock_value ? format_price(stock_value[0].VALUE) : 0}{" "}
              <Text style={[styles.total, { fontSize: fontSizes.h5 }]}>
                {languages.t(expressions.da)}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.gain, { fontSize: fontSizes.title }]}>
            {languages.t(expressions.total_gain)}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.gain}>
              {gain ? format_price(gain[0].VALUE) : 0}{" "}
              <Text style={[styles.gain, { fontSize: fontSizes.h5 }]}>
                {languages.t(expressions.da)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <LastButton
        title={languages.t(expressions.new_product)}
        onPress={() => navigation.navigate("NewProduct")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gain: {
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

export default MyProducts;
