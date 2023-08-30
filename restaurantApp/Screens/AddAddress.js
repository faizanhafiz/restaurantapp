import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
import Loader from "./Loader";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddAddress = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const handleBlur1 = () => setIsFocused1(false);
  const handleFocus1 = () => setIsFocused1(true);

  const handleBlur2 = () => setIsFocused2(false);
  const handleFocus2 = () => setIsFocused2(true);

  const handleBlur3 = () => setIsFocused3(false);
  const handleFocus3 = () => setIsFocused3(true);

  const { token, userData, showToastedError, showToastedSuccess, getUserData } =
    useContext(AuthContext);

  const handleAddAddress = async () => {
    try {
      if (address.length <= 0) {
        showToastedError("please enter address");
        return;
      } else if (landmark.length <= 0) {
        showToastedError("please enter landmark");
        return;
      }

      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/user/addAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: address,
          landmark: landmark,
          newMobile: newMobile,
        }),
      });

      if (response.status === 200) {
        console.log(response.status);
        setIsLoading(false);
        showToastedSuccess("address added");
        getUserData();
        navigation.navigate("Checkout");
      } else if (response.status === 400) {
        console.log(response.status);
        console.log(response.json().message);
        setIsLoading(false);
      } else if (response.status === 500) {
        // ... handle error ...
        console.log(response.status);
        console.log(response.json().message);
        setIsLoading(false);
        showToastedError(response.json().message);
      } else {
        console.log(response.status);
        setIsLoading(false);
        showToastedError("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error inside handleAddAddress ", error);
    }
  };

  return (
    <>
      <View style={styles.modalView}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <Text style={styles.addressTitle}>Add New Address</Text>
          <TextInput
            style={[
              styles.modalInput,
              isFocused1 && styles.inputContainerFocus,
            ]}
            placeholder="Enter address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
          />
          {/* <CustomeInput
          placeholder="Enter address"
          secureText={false}
          setValue={address}
        /> */}
          <TextInput
            style={[
              styles.modalInput,
              isFocused2 && styles.inputContainerFocus,
            ]}
            placeholder="Enter landmark"
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
          />

          {/* <CustomeInput
          placeholder="Enter landmark"
          secureText={false}
          setValue={landmark}
        /> */}
          <TextInput
            style={[
              styles.modalInput,
              isFocused3 && styles.inputContainerFocus,
            ]}
            placeholder="Enter new mobile number (optional)"
            value={newMobile}
            onChangeText={(text) => setNewMobile(text)}
            onFocus={handleFocus3}
            onBlur={handleBlur3}
          />

          {/* <CustomeInput
          placeholder="Enter new mobile number (optional)"
          secureText={false}
          setValue={newMobile}
        /> */}

          <Pressable
            style={[
              styles.addAddressButton,
              (!address || !landmark) && styles.disabledButton,
            ]}
            disabled={!address || !landmark}
            onPress={handleAddAddress}
          >
            <Text style={styles.textStyle}>Add</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: "30%",
  },
  modalView: {
    height: windowHeight,
    width: windowWidth,

    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  inputContainerFocus: {
    borderColor: "blue",
  },

  addressTitle: {
    fontSize: 18,
    fontWeight: "600",
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
    borderWidth: 1.5,
  },
  addAddressButton: {
    backgroundColor: "#FF6200",
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
});
