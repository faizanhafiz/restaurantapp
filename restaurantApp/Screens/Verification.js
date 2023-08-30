import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomeInput from "../Components/CustomeInput";
import CustomeButton from "../Components/CustomeButton";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../Utility/config";
import Loader from "./Loader";
const VerifyCode = () => {
  console.warn(code);
};
const Verification = ({navigation}) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, showToastedSuccess, showToastedError } =
    useContext(AuthContext);
  const VerifyCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/user/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      if (response.status == 400) {
        setIsLoading(false);
        showToastedError("enter correct otp");
      } else if (response.status === 200) {
        setIsLoading(false);
        showToastedSuccess("email verified");
        navigation.navigate("loginScreen")
      } else if (response.status === 404) {
        setIsLoading(false);
        showToastedError("email not registered");
      } else if (response.status == 500) {
        setIsLoading(false);
        showToastedError("something went wrong try again");
      } else {
        setIsLoading(false);
        showToastedError("server error");
      }
    } catch (error) {
      setIsLoading(false);
      showToastedError("network erro");
      console.log("exception inside Verification", error);
    }
  };
  return (
    <>
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginVertical: 10 }}>Verification</Text>
      <Text style={{ fontSize: 16, fontWeight: 300, marginBottom: 40 }}>
        Enter the code we just send you on your email address
      </Text>

      <CustomeInput
        placeholder="enter registered email"
        secureText={false}
        setValue={setEmail}
      />

      <CustomeInput
        placeholder="enter OTP"
        keyBoardType="numeric"
        secureText={false}
        setValue={setOtp}
      />
      <CustomeButton onPress={VerifyCode} text="verify email"></CustomeButton>
    </View>
    {isLoading?<Loader/>:null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});

export default Verification;
