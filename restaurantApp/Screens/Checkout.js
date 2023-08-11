
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Checkout = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [newAddress, setNewAddress] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newMobile, setNewMobile] = useState("");

  const address = [
    {
      id: 1,
      address: "Badi Talab",
      landmark: "Zilani dukan",
      mobile: 9576808817,
    },
    {
      id: 2,
      address: "Badi Talab",
      landmark: "Zilani dukan",
      mobile: 9576808817,
    },
  ];

  const handleAddNewAddress = () => {
    if (newAddress.length <= 0) {
      console.warn("please enter address");
    }

    console.warn("added");
    setModalVisible(false);
  };

  const placeOrderHandler = () => {
  // console.warn("Order Placed");
    navigation.navigate("orderConfirmScreen")
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
        <Text style={styles.addressTitle}>
          Address {item.id}
          {isSelected ? " (Selected)" : ""}
        </Text>
        <Text>{item.address}</Text>
        <Text>{item.landmark}</Text>
        <Text style={{ marginVertical: 5 }}>{item.mobile}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
         <KeyboardAvoidingView
          behavior="padding"
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.addressTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter address"
              value={newAddress}
              onChangeText={(text) => setNewAddress(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter landmark"
              value={newLandmark}
              onChangeText={(text) => setNewLandmark(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new mobile number (optional)"
              value={newMobile}
              onChangeText={(text) => setNewMobile(text)}
            />
            <Pressable
              style={[
                styles.addAddressButton,
                (!newAddress || !newLandmark) && styles.disabledButton,
              ]}
              disabled={!newAddress || !newLandmark}
              onPress={handleAddNewAddress}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    

      <StatusBar hidden  />
       
      <View style={{flexDirection:'row' ,alignItems:'center'}}>
      <TouchableOpacity style={styles.header}>
        <Icon name="arrow-left" size={26} color="#000" />
        
      </TouchableOpacity>
      <Text style={styles.headingTitle}>Check Out</Text>
      </View>
     

      <View style={styles.addressSection}>
        <View style={styles.addressHeading}>
          <Text style={styles.subheading}>Address</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={[styles.subheading, { fontSize: 14, color: "#FF6200" }]}
            >
              Add Address
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={address}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} // Convert to string
          renderItem={renderAddress}
        />
      </View>

      {/* ... Payment and Total sections */}
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

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={placeOrderHandler}
        >
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    
    </SafeAreaView>
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

  modalInput: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    marginVertical: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    justifyContent:'center',
    alignItems:'center',
    width: "90%",
    margin: 10,
    
    
    
    // #FF6200
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  addAddressButton: {
    backgroundColor: "#000",
    height: windowHeight * 0.07,
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  modalHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    margin:5
  }
});

export default Checkout;

