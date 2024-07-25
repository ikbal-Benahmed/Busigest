import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { fonts, fontSizes } from "../theme/fonts";
import { sizes } from "../theme/sizes";
import Clientcard from "../Utils/cards/clientCard";
import { Searchbar } from "react-native-paper";
import { getClients, getClientWithTotalSpending } from "../backend/functions";
import LastButton from "../Utils/LastButton";

const MyClients = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const [result, setResult] = useState([]);
  const [clients, setClients] = useState([]);
  const fetchResults = (res) => {
    setResult(res);
  };
  const fetchClients = (res) => {
    setClients(res);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getClients(fetchClients);
      getClientWithTotalSpending(fetchResults);
    });
    return unsubscribe;
  }, [navigation]);
  let mydata = [];
  if (result.length > 0 && clients.length > 0) {
    mydata = result;
    for (let i = result.length; i <= clients.length; i++) {
      let newOb = clients[i];
      if (newOb) {
        newOb.amount = 0;
        mydata.push(newOb);
      }
    }
  }
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
          My clients
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
          {console.log(mydata)}
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      </View>
      {mydata.length > 0 && (
        <FlatList
          data={
            mydata
              ? mydata
                  .filter((item) => {
                    if (
                      item.NAME.toLowerCase().includes(
                        searchQuery.toLowerCase().trim()
                      ) ||
                      // item.amount
                      //   .toLowerCase()
                      //   .includes(searchQuery.toLowerCase()) ||
                      item.CITY.toLowerCase().includes(
                        searchQuery.toLowerCase().trim()
                      )
                    ) {
                      return item;
                    }
                  })
                  .sort((a, b) => {
                    if (a.amount === b.amount) {
                      // If two elements have same number, then the one who has larger rating.average wins
                      return b.NAME - a.NAME;
                    } else {
                      return b.amount - a.amount;
                    }
                  })
              : mydata
          }
          renderItem={({ item }) => {
            return (
              <Clientcard
                key={item.id}
                name={item.NAME}
                city={item.CITY}
                phoneN={item.PHONE}
                id={item.id}
                amount={item.amount}
                // callback={updateAmount}
                onPress={() => {
                  navigation.navigate("ClientDetails", { item });
                  mydata = [];
                  setResult([]);
                  setClients([]);
                }}
              />
            );
          }}
          keyExtractor={(item) => {
            item.id.toString();
          }}
          contentContainerStyle={{ padding: 4 }}
        />
      )}

      <LastButton
        title="New client"
        onPress={() => navigation.navigate("NewClient")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyClients;
