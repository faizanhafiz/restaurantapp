import { View, Text } from "react-native";
import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomeInput = ({
  placeholder,
  textvalue,
  secureText ,
  keyBoardType="default",
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={textvalue}
      secureTextEntry={secureText}
      style={styles.input}
      keyboardAppearance="light"
      keyboardType={keyBoardType}
      
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,

    borderRadius: 5,
    paddingLeft: 10,
    borderColor:'gray',
    borderWidth:2,
    
    width: "80%",
    
    fontSize: 16,
    backgroundColor:'white',
    borderWidth:1,
   
    margin:10
  }
});

export default CustomeInput;
