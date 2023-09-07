import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,

} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
import Loader from "./Loader";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Checkout = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


  const [isLoading, setIsLoading] = useState(false);

  const { token, userData, showToastedError,getOrder, showToastedSuccess, getUserData } =
    useContext(AuthContext);

  const placeOrderHandler = async () => {
    try {
      if(userData.address.length==0)
      {
        showToastedError("Please Added Address");
        return;
      }
      if (selectedAddressId == null) {
        showToastedError("Please select Address");
        return;
      }

      setIsLoading(true);
      await fetch(`${BASE_URL}/order/placeOrder/${selectedAddressId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          getUserData();
          getOrder();
          console.log("order booked");
          navigation.navigate("OrderConfirmPage");
         
        } else if (response.status == 400) {
          console.log("400")
          setIsLoading(false);
          showToastedError("");
        } else if (response.status === 500) {
          console.log("500")
          setIsLoading(false);
          showToastedError("Server error");
        } else {
          console.log("else")
          setIsLoading(false);
          showToastedError("something went wrong please try again");
        }
      });
    } catch (error) {
       
      setIsLoading(false);
      console.log("Error inside placeOrderHandler", error);
    } 
  };

  const renderAddress = ({ item }) => {
    const isSelected = selectedAddressId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.addressContainer,
          isSelected && styles.selectedAddressContainer,
        ]}
        onPress={() => {
          setSelectedAddressId(item.id);
        }}
      >
        <Text>{item.address}</Text>
        <Text>{item.landmark}</Text>
        <Text>{item.newMobile}</Text>
        <Text>{item.mobile}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
       
        <View style={styles.addressSection}>
          <View style={styles.addressHeading}>
            <Text style={styles.subheading}>Address</Text>
            <TouchableOpacity onPress={() => navigation.navigate('addAddressScreen') }>
              <Text
                style={[styles.subheading, { fontSize: 14, color: "#FF6200" }]}
              >
                Add Address
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={userData.address}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id} // Convert to string
            renderItem={renderAddress}
          />
        </View>

        {/* ... Payment and Total sections */}
        <View style={styles.paymentSection}>
          <Text style={styles.subheading}>Payment</Text>

          <View style={styles.paymentStyle}>
            <Text style={styles.cashondelivery}>Cash on Delivery</Text>
            <Text style={styles.cashondeliveryprice}>
              {"\u20B9"} {userData.cartTotal}
            </Text>
          </View>

          <View style={styles.paymentStyle}>
            <Text style={styles.cashondelivery}>UPI Payment</Text>
            <Text style={styles.cashondeliveryprice}>comming Soon</Text>
          </View>
        </View>

        <View style={styles.totalSection}>
          <View>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>
              {"\u20B9"} {userData.cartTotal}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={placeOrderHandler}
          >
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? <Loader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9",
    padding: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: windowWidth * 0.2,
    height: windowHeight * 0.08,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    margin: 10,
  },
  cashondelivery: {
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
    backgroundColor: "#FF6200",
    height: windowHeight * 0.07,
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  paymentStyle: {
    width: windowWidth * 0.9,
    elevation: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  cashondeliveryprice: {
    fontSize: 16,
    fontWeight: "800",
    margin: 5,
  },
  selectedAddressContainer: {
    borderColor: "#FF6200",
    borderWidth: 2,
  },
  addressHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Checkout;
