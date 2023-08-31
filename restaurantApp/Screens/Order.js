import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FlatList } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Order = () => {
  const { order, getOrder, showToastedSuccess, showToastedError } =
    useContext(AuthContext);

  useEffect(() => {
    getOrder();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return { color: "green" };
      case "REJECTED":
        return { color: "red" };
      case "DELIVERED":
        return { color: "blue" };
      case "PENDING":
        return { color: "red" };
    }
  };

  const orderRender = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={{ width: "50%", height: "100%" }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "90%", height: "90%", margin: 10 }}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 2,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            {item.productName}
          </Text>
          <Text style={getStatusColor(item.status)}>{item.status}</Text>

          <Text>Quantity:{item.quantity}</Text>
          <Text>{item.orderDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {order.length == 0 ? (
        <View style={styles.footerContainer}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image
              source={require("../assets/emptyorder.jpg")}
              style={styles.footerImage}
            />
            <Text style={{fontWeight:600,fontSize:16}}>Your Plate is Empty</Text>
            <Text>Fill it with your first Food order.</Text>
          </View>
        </View>
      ) : (
        <FlatList
          style={styles.scrollView}
          data={order}
          renderItem={orderRender}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 24,
                fontWeight: "bold",
                backgroundColor: "#fff",
                flex: 2,
              }}
            >
              Your Orders
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    backgroundColor:'#fff5'
  },
  scrollView: {
    marginHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 120,
    marginVertical: 2,
    // elevation: 10,
    padding: 10,
     
  },
  footerContainer: {
    // Occupy all remaining vertical space
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
     
  },
});
