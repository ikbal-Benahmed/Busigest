import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { colors } from "./src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_300Light,
  Roboto_100Thin,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useOpenSans,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import NewClient from "./src/pages/newClient";
import MyClients from "./src/pages/myClients";
import NewPurchase from "./src/pages/newPurchase";
import NewProduct from "./src/pages/newProduct";
import Welcome from "./src/pages/welcome";
import MyProducts from "./src/pages/myProducts";
import ClientDetails from "./src/pages/ClientDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPurchases from "./src/pages/myPurchases";
import PurchaseDetails from "./src/pages/purchaseDetails";

import { Button } from "react-native-paper";
import {
  addClient,
  addProduct,
  emptyDB,
  getClientName,
  getClients,
  getCommandes,
  getCommandeWithTurnover,
  getDetailsCommandes,
  getProductenr,
  getProducts,
  getTop3,
  openDB,
  readQuery,
  removeDB,
  removePurchaseFromId,
  writeQuery,
} from "./src/backend/functions";
import Productetails1 from "./src/pages/ProductDetails1";
import db from "./src/backend/DataBase";
import { checkDB, exportDB } from "./src/backend/exportDB";

const Stack = createNativeStackNavigator();

export default function App() {
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_300Light,
    Roboto_100Thin,
    Roboto_700Bold,
    Roboto_900Black,
  });
  const [openSansLoaded] = useOpenSans({
    OpenSans_600SemiBold,
  });
  if (!robotoLoaded || !openSansLoaded) {
    return null;
  }

  return (
    // <View style={styles.test_container}>
    //   <Button
    //     onPress={async () => {
    //       const db = openDB();
    //       addClient("John Doe", "0540693123", "Bordj Bou Arreridj");
    //       // getClients();
    //       // readQuery(
    //       //   `SELECT * FROM PRODUCT
    //       //  LEFT JOIN PRODUCT_ENR ON PRODUCT.IDPRODUCT = PRODUCT_ENR.IDPRODUCT`,
    //       //   db,
    //       //   (res) => {
    //       //     console.log(res);
    //       //   }
    //       // );
    //       // writeQuery(
    //       //   `UPDATE PRODUCT_ENR SET QTE = 0 WHERE IDENR = 1`,
    //       //   db,
    //       //   (res) => {
    //       //     console.log(res);
    //       //   }
    //       // );
    //       //   `SELECT * FROM PRODUCT_ENR
    //       //     WHERE IDPRODUCT = ${1}
    //       //     AND BPRICE = ${100}
    //       //     AND SPRICE = ${200}`,
    //       //   db,
    //       //   (res) => console.log(res)
    //       // );
    //       // drop table PRODUCT_ENR with writeQuery function
    //       // writeQuery(`DROP TABLE PRODUCT_ENR`, db);
    //     }}
    //   >
    //     <Text>Add</Text>
    //   </Button>
    //   <Button
    //     onPress={async () => {
    //       emptyDB();
    //     }}
    //   >
    //     <Text>EMPTY</Text>
    //   </Button>
    //   <Button
    //     onPress={() => {
    //       const db = openDB();
    //       // readQuery(`SELECT * FROM PRODUCT `, db, (newRes) => {
    //       //   console.log("====================================");
    //       //   console.log(newRes);
    //       //   console.log("====================================");
    //       // });
    //       // getProducts();
    //       getClients();
    //     }}
    //   >
    //     <Text>Get</Text>
    //   </Button>
    // </View>

    <View style={styles.container}>
      {/* {emptyDB()} */}
      <LinearGradient
        colors={[colors.deepBlue, colors.gradientSoftBlue]}
        style={styles.linearGradient}
      />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: "blue",
              },
            }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="NewClient" component={NewClient} />
            <Stack.Screen name="NewProduct" component={NewProduct} />
            <Stack.Screen name="NewPurchase" component={NewPurchase} />
            <Stack.Screen name="MyProducts" component={MyProducts} />
            <Stack.Screen name="MyClients" component={MyClients} />
            <Stack.Screen name="ProductDetails" component={Productetails1} />
            <Stack.Screen name="ClientDetails" component={ClientDetails} />
            <Stack.Screen name="MyPurchases" component={MyPurchases} />
            <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  test_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
