import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Checkout = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity style={styles.header}>
        <Icon name="arrow-left" size={25} color="#000" />
        <Text style={styles.headingTitle}>CheckOut</Text>
      </TouchableOpacity>

      <View style={styles.addressSection}>
        <Text style={styles.subheading}>Address</Text>

        <View style={styles.addressContainer}>
          <View>
            <Text style={styles.addressTitle}>Address 1</Text>
            <Text>Badi Talab</Text>
            <Text>Islam Nagar</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View>
            <Text style={styles.addressTitle}>Address 2</Text>
            <Text>Near Imambada</Text>
            <Text>Neem Mohallah</Text>
          </View>
        </View>

        

        
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.subheading}>Payment</Text>

        <View style={styles.paymentStyle}>
         <Text style={styles.cashondelivery}>Cash on Delivery</Text>
                  <Text style={styles.cashondeliveryprice}>{"\u20B9"} 44.39</Text>
        </View>

        <View style={styles.paymentStyle}>
         <Text style={styles.cashondelivery}>UPI Payment</Text>
                  <Text style={styles.cashondeliveryprice}>comming Soon</Text>
        </View>
      </View>
      
      

      <View style={styles.totalSection}>
        <View>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>{"\u20B9"} 44.39</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: windowWidth * 0.5,
    height: windowHeight * 0.08,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  cashondelivery:{
  fontSize: 16,
    fontWeight: "600",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    margin: 5,
  },
  addressSection: {
    height: windowHeight * 0.4,
  },
  addressContainer: {
    width: windowWidth * 0.9,
    elevation: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  paymentSection: {
    height: windowHeight * 0.37,
  },
  totalSection: {
    height: windowHeight * 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: windowWidth * 0.05,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "400",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  placeOrderButton: {
    backgroundColor: "#000",
    height: windowHeight * 0.07,
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  paymentStyle:{
   width: windowWidth * 0.9,
    elevation: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  cashondeliveryprice:{
                  fontSize:16,
                  fontWeight:'800',
                  margin:5
  }
});

export default Checkout;
