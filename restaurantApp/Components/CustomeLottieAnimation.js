import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from 'lottie-react-native';


const CustomeLottieAnimation = ({animationloc}) => {
      
              
  return (
    <View style={styles.container}>
      <LottieView
         
         autoPlay
         source={animationloc}
         loop
         resizeMode="contain"
       />
     
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    height:'100%'
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default CustomeLottieAnimation;
