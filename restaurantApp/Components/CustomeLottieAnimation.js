import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from 'lottie-react-native';


const CustomeLottieAnimation = ({animationloc}) => {
      
              
  return (
    <View style={[StyleSheetList.absoluteFillobject,styles.container]}>
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
    
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default CustomeLottieAnimation;
