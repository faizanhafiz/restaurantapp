import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "./AuthStackNavigator";
import { AuthContext } from "../Context/AuthContext";
import { AppBottomStackNavigator } from "./AppBottomStackNavigator";
import { ActivityIndicator } from "react-native-paper";
import CustomeLottieAnimation from "../Components/CustomeLottieAnimation";

export default function AppNav() {
  const { isLoading, token } = useContext(AuthContext);
  const animationPath = require("../assets/loading2animation.json");
  // if (isLoading==true) {
  //   return (
                  
       
  //       <CustomeLottieAnimation animationloc={animationPath}/>
      
  //   );
  // }
  return (
    <NavigationContainer>
      {token !== null ? <AppBottomStackNavigator /> : <AuthStackNavigator/>}
    </NavigationContainer>
  );
}
