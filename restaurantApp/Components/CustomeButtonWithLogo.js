import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
//../assets/facebooklogo.png
const CustomeButtonWithLogo = ({ logoLocation}) => {
  return (

    <TouchableOpacity style={styles.button} >
      <Image source={require("../assets/facebooklogo.png")} style={styles.image} />
    </TouchableOpacity>
    


  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff", // Customize the button background color
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 50, // Customize the image width
    height: 50, // Customize the image height
    resizeMode: "contain", // Adjust the image resizing mode as needed
  },
});

export default CustomeButtonWithLogo;
