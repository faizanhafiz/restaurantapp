import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomeInput from "../Components/CustomeInput";
import CustomeButton from "../Components/CustomeButton";
const VerifyCode = () => {
  console.warn(code);
};
const Verification = () => {
  [code, setCode] = useState();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginVertical: 10 }}>Verification</Text>
      <Text style={{ fontSize: 16, fontWeight: 300, marginBottom: 40 }}>
        Enter the code we just send you on your email address
      </Text>

      <CustomeInput
        placeholder="Code"
        keyBoardType="numeric"
        secureText={false}
        setValue={setCode}
      />
      <CustomeButton onPress={VerifyCode} text="Verify Code"></CustomeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});

export default Verification;
